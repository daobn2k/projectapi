import React from 'react';
import { Button } from 'antd';
import './style.css';
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";
import moment from 'moment';
import { convertTimeStampUTCToLocal } from '../../shared';
const ExportExcelComponent = (props) => {
    const { dataExport = {} } = props
    const getSheetData = (data, header =[], listFiledName = []) =>{
  
        var sheetData = [];
            sheetData =data.map( (row) =>{
                return listFiledName.map( (fieldName) =>{
                    const isDate =  Array.isArray(fieldName.split('_')) && fieldName.split('_').length > 0 && fieldName.split('_')[fieldName.split('_').length - 1] === 'date' ? true : false
                    const isDateTime =  Array.isArray(fieldName.split('_')) && fieldName.split('_').length > 0 && fieldName.split('_')[fieldName.split('_').length - 1] === 'time' ? true : false

                    if(typeof row[fieldName] === 'object'){
                        return row[fieldName] && row[fieldName].name ?  row[fieldName].name  : ''
                    }
                    if(typeof  row[fieldName] === 'string' ||  typeof row[fieldName] === 'number') {
                        return row[fieldName] ? row[fieldName] : "";
                    }
                    if(fieldName === 'dob' ||  isDate){
                        return row[fieldName] ?  convertTimeStampUTCToLocal(row[fieldName]): "" ;
                    }
                    if(isDateTime) {
                        return row[fieldName] ?  convertTimeStampUTCToLocal(row[fieldName]): "" ;
                    }
                });
              });

              sheetData.unshift(header);
          
              return sheetData;
      }
    
    
     const saveAsExcelStatistical = async (dataExport) => {
        
        const { data = [],header = [] , key = [] ,fileName = ''} = dataExport
    
        const headerExcel = header.filter(i=>i !== 'Thao tác') 

        const columnExcel = key.filter(i=>i !=='action')

        XlsxPopulate.fromBlankAsync().then(async (workbook) => {
          const sheet1 = workbook.sheet(0);
          const sheetData = getSheetData(data,headerExcel,columnExcel);
          const range1 = workbook.sheet(0).range("B2:H3");
          range1.value(fileName.toUpperCase());
          range1.style({horizontalAlignment: "center", verticalAlignment: "center", })
          range1.merged(true);
          range1.style("border", true);
    
          sheet1.cell("A7").value(sheetData);
          sheet1.row(7).style("bold", true);
          sheet1.row(2).style("bold", true);
    
            const idxMax = data.length + 7;
            let idxEnd = Math.min(idxMax, 500);
            let idxBegin = 7;
            while (idxBegin < idxMax)
            {
                workbook.sheet(0).range(`A${idxBegin}:AD${idxEnd}`).style("border", true);
                idxBegin = idxEnd + 1;
                idxEnd = Math.min(idxMax, idxEnd + 500);
            }
    
           workbook.sheet(0).range("A7:AD7").map(cell => {
              let nameCell = sheet1.row(7).cell(cell._columnNumber).columnName();
           sheet1.column(nameCell).width(cell && cell._value && cell._value.length > 0? cell._value.length + 8 : 0);
           sheet1.column("AD").width(cell && cell._value && cell._value.length > 0 ? cell._value.length + 70 : 0) ;
           
    
          })
          return workbook.outputAsync().then((res) => {
            saveAs(res, `${fileName} ${moment(new Date()).format('DD-MM-YYYY')}.xlsx`);
          });
        });
      }
    return (
        <div className="export-excel">
            <Button className="export-excel--button" onClick={()=>saveAsExcelStatistical(dataExport)}>Xuất File Excel</Button>
        </div>
    );
};

export default ExportExcelComponent;
