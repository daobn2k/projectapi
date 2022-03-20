import { useEffect, useState } from "react"
import axios from "axios"
import moment from "moment"


export default function getDataByUrl(url,params){

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.get(url,{params})
                    setData(response.data)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url,params])

    return { data, error, loading }
}


export const convertTimeStampUTCToLocal = (time, format='DD/MM/YYYY',notHMS = false) => {
    const newTimeUTC = moment(time).format(format);
    if(String(newTimeUTC) === 'Invalid date') return ''
    return newTimeUTC
};

export const convertTimeStampLocalToUTC = (time, format='DD-MM-YYYY') => {
    const newTime = moment(time, 'YYYY-MM-DD HH:mm:ss').isValid() ? 
        moment(time,'YYYY-MM-DD HH:mm:ss').format(format)
        : '';
    return newTime;
};


export const listCertiFicate = [
    {
        id:'1',
        value:'1',
        label:'Xuất Sắc',
    },
    {
        id:'2',
        value:'2',
        label:'Giỏi',
    },
    {
        id:'3',
        value:'3',
        label:'Khá',
    },
    {
        id:'4',
        value:'4',
        label:'Trung Bình',
    },
    {
        id:'1',
        value:'1',
        label:'Yếu',
    }
] 


export const listCheckRoleUser = [
    {
        id:'1',
        value:'1',
        label:'Nhân Viên'
    },
    {
        id:'2',
        value:'2',
        label:'Trưởng ban điều hành'
    },
    {
        id:'3',
        value:'3',
        label:'Lãnh đạo cấp cao'
    },
    {
        id:'4',
        value:'4',
        label:'Ban điều hành tập đoàn'
    }
]

export const listGender = [
    {
        id:'1',
        value:'1',
        label:'Nam'
    },
    {
        id:'2',
        value:'2',
        label:'Nữ'
    },
    {
        id:'3',
        value:'3',
        label:'Khác'
    },
]