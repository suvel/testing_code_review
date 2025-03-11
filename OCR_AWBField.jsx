import React, { useState, useEffect } from "react";
import TextField from "../../../components/common/fields/TextField";

const OCR_AWBField = ({ value, onHandelChange, ...rest }) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <TextField
      value={localValue}
      handleTextChange={(event) => {
        const value = event?.target?.value;
        setLocalValue(value);
      }}
      onBlur={() => {
        onHandelChange(localValue);
      }}
      onKeyUp={(e) => {
        const valueEntered = e.target.value;
        if (e.key === "Enter") {
          onHandelChange(valueEntered);
        }
      }}
      {...rest}
    />
  );
};

export default OCR_AWBField;
