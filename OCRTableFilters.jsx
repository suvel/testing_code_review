import React, { useState,useEffect } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import color from "../../../components/common/colors.json";
import SubTitleBar, {
  SubTitleBarContainer,
} from "../../../components/common/SubTitleBar";
import { ButtonBase, styled } from "@mui/material";
import dayjs from "dayjs";
import MuiAutocomplete from "../../../components/common/dropdown/muiAutocomplete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Checkbox from "@mui/material/Checkbox";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "./OCRTableFilters.css";
import TextField from "../../../components/common/fields/TextField";
import { calculateEndDate } from "../utils/helper";
import OnBlurDateField from "./OnBlurDateField";
import OCR_AWBField from './OCR_AWBField'
import SelectField from "../../../components/common/fields/SelectField";
import { isArray, isNull } from "../../../pages/common/helper";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const CustomToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  borderRadius: "10px",
  outline: `1px solid ${color?.blueColor}`,
  overflow: "hidden",

  "& .MuiButtonBase-root": {
    border: "0px",
    color: color?.blueColor,
    padding: "10px 15px",
  },

  "& .MuiToggleButton-root.Mui-selected": {
    backgroundColor: color?.blueColor,
    color: "white",
  },

  "& .MuiToggleButton-root:first-of-type": {
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
  },

  "& .MuiToggleButton-root:last-of-type": {
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  },
}));

const today = dayjs();
const _90dayBeforeToday = dayjs().subtract(91,'days');

export const ocrTableFilterInitialState = {
  fromDate: _90dayBeforeToday.startOf('day'),
  toDate: today.startOf('day'),
  matchType: "all",
  missingType: "default",
  awbNumber: null,
  origin: null,
  country: null,
  flight: null,
};

const OCRTableFilters = ({
  filterValue,
  onFilterValueChange,
  originOptions,
  countryOptions,
  flightOptions,
  onDownloadClick,
  tableData
}) => {
  const handelFilterChange = (value = "", fieldname) => {
    onFilterValueChange({ [fieldname]: value });
  };



  const handleMatchTypeFilter = (event, newData) => {
    if (newData !== null) onFilterValueChange({ matchType: newData });
  };

  const originSelectOptions = originOptions?.map((v) => ({ label: v, value: v }))
  const countrySelectOptions = countryOptions?.map((v) => ({
    label: v,
    value: v,
  }))
  const flightSelectOptions = flightOptions?.map((v) => ({
    label: v,
    value: v,
  }))

  const handleOnFromDateChange=(val) => {
    const newFromDate = dayjs(val).startOf("day");
    onFilterValueChange({ fromDate: newFromDate });
  }

  const handleOnToDateChange=(val) => {
    const newToDate = dayjs(val).startOf("day");
    onFilterValueChange({ toDate: newToDate });
  }

  return (
    <>

      <SubTitleBarContainer className='OCR_filter-container'>
        <Stack direction={'row'} sx={{width:'100%'}} justifyContent={'space-between'} flexWrap={'wrap'} gap={'15px'}  >
        <CustomToggleButtonGroup
          value={filterValue.matchType}
          exclusive
          onChange={handleMatchTypeFilter}
          aria-label="text alignment"
          color="primary"
        >
          <ToggleButton value="all" aria-label="all_togglebutton">
            All
          </ToggleButton>
          <ToggleButton value="match" aria-label="match_togglebutton">
            Match
          </ToggleButton>
          <ToggleButton value="no_match" aria-label="no_match_togglebutton">
            No Match
          </ToggleButton>
        </CustomToggleButtonGroup>
        <Stack direction={"row"} gap={"15px"} flexWrap={'wrap'} >
         <Box sx={{
    width: "180px",
  }}>
            <OnBlurDateField
             data-testid='start-date'
              value={filterValue.fromDate}
              min={null}
              max={today}
              fieldName={"fromDate"}
              label={"Start Date"}
              handelUpdate={handleOnFromDateChange}
            />
        </Box>
        <Box sx={{
    width: "180px",
  }}>
            <OnBlurDateField
             data-testid='end-date'
              value={filterValue.toDate}
              min={filterValue?.fromDate||null}
              max={calculateEndDate(filterValue?.fromDate,filterValue?.toDate,today)}
              fieldName={"toDate"}
              label={"End Date"}
              handelUpdate={handleOnToDateChange}
            />
         </Box>
         <OCR_AWBField
          value={filterValue?.awbNumber}
          onHandelChange={(value)=>{
            handelFilterChange(value, "awbNumber");
          }}
          fieldName={'mawb'}
          label={''}
          customProp={{
             padding:"0px",
             placeholder:"AWB Number"
          }}
          showError={false}
          endIcon={null}
          placeholder={null}
          helperText={null}
          type={'number'}
         />
         <SelectField
          className={"ocr-select"}
          value={filterValue?.country}
          fieldName={'country'}
          label={'Country'}
          customProp= {{
            isMulti: true,
            padding: "0px",
          }}
          handleSelectChange={(selectedCountry)=>{
            let value;
            if (isArray(selectedCountry))
              value = isNull(selectedCountry) ? [] : selectedCountry.map((eachValue) => eachValue.value);
            else {
              value = selectedCountry ? selectedCountry.value : [];
            }
            handelFilterChange(value, "country");
          }}
          onBlur={()=>{}}
          options={countrySelectOptions}
          isClearable={true}
          error={null}
         />
         <SelectField
          className={"ocr-select"}
          value={filterValue?.origin}
          fieldName={'origin'}
          label={'Origin'}
          customProp= {{
            isMulti: true,
            padding: "0px",
          }}
          handleSelectChange={(selectedCountry)=>{
            let value;
            if (isArray(selectedCountry))
              value = isNull(selectedCountry) ? [] : selectedCountry.map((eachValue) => eachValue.value);
            else {
              value = selectedCountry ? selectedCountry.value : [];
            }
            handelFilterChange(value, "origin");
          }}
          onBlur={()=>{}}
          options={originSelectOptions}
          isClearable={true}
          error={null}
         />
         <SelectField
          className={"ocr-select"}
          value={filterValue?.flight}
          fieldName={'flight'}
          label={"Flight No"}
          customProp= {{
            isMulti: true,
            padding: "0px",
          }}
          handleSelectChange={(selectedCountry)=>{
            let value;
            if (isArray(selectedCountry))
              value = isNull(selectedCountry) ? [] : selectedCountry.map((eachValue) => eachValue.value);
            else {
              value = selectedCountry ? selectedCountry.value : [];
            }
            handelFilterChange(value, "flight");
          }}
          onBlur={()=>{}}
          options={flightSelectOptions}
          isClearable={true}
          error={null}
         />
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ButtonBase disabled={!(filterValue?.fromDate && filterValue?.toDate) || !tableData?.length} onClick={onDownloadClick}>
              <CloudDownloadIcon sx={{color:`${color?.grayShade3}`}} />
            </ButtonBase>
          </Box>
        </Stack>
        </Stack>
      </SubTitleBarContainer>
    </>
  );
};

export default OCRTableFilters;
