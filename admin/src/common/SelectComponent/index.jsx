import React from "react";
import { Select } from "antd";

const { Option } = Select;
const SelectComponent = (props, ref) => {
  const {
    name,
    onChange,
    onSearch,
    placeholder,
    dataOptions = [],
    ...rest
  } = props;

  return (
    <Select
      showSearch
      placeholder={placeholder}
      onSearch={onSearch}
      onChange={onChange}
      allowClear
      {...rest}
    >
      {dataOptions.length > 0 &&
        dataOptions.map((item, index) => {
          return (
            <Option value={item.value} key={index}>
              {item.label}
            </Option>
          );
        })}
    </Select>
  );
};

export default SelectComponent;
