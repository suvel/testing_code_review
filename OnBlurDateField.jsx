import React, { useState, useEffect } from "react";

import DateField from "../../../components/common/fields/DateField";

const OnBlurDateField=(props)=>{
    const [localDate,setLocalDate] = useState(null);
    const {value,handelUpdate,...rest} = props;
  
    useEffect(() => {
      setLocalDate(value);
    }, [value]);
  
    const handelOnBlur=(event)=>{
      handelUpdate(localDate)
    }
  
    return(
      <DateField
      customProp={{ padding: "0px"}}
      value={localDate}
      onBlur={handelOnBlur}
      onAccept={(dateValue)=>handelUpdate(dateValue)}
      onChange={(_,v)=>setLocalDate(v)}
      {...rest}
     />
    )
  }

export default OnBlurDateField