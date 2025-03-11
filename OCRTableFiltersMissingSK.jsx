import React, { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import color from "../../../components/common/colors.json";
import { SubTitleBarContainer } from "../../../components/common/SubTitleBar";
import { ButtonBase } from "@mui/material";
import dayjs from "dayjs";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "./OCRTableFilters.css";
import { calculateEndDate } from "../utils/helper";
import OnBlurDateField from "./OnBlurDateField";
import OCR_AWBField from "./OCR_AWBField";

const today = dayjs();
const _90dayBeforeToday = dayjs().subtract(91,'days');

export const ocrTableFilterInitialState = {
  fromDate: _90dayBeforeToday.startOf('day'),
  toDate: today.startOf('day'),
  matchType: "all",
  missingType: "default",
  awbNumber: null,
  origin: null,
  destination: null,
  flight: null,
  
};

const OCRTableFiltersMissingSK = ({
  filterValue,
  onFilterValueChange,
  onDownloadClick,
  tableData
}) => {
  const [awbNumber,setAwbNumber] = useState(filterValue?.awbNumber)
  const handelFilterChange = (value = "", fieldname) => {
    onFilterValueChange({ [fieldname]: value });
  };

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
        <Stack
          direction={"row-reverse"}
          gap={"15px"}
          sx={{ width: "100%", flexWrap: "wrap" }}
        >
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ButtonBase disabled={!(filterValue?.fromDate && filterValue?.toDate) || !tableData?.length} onClick={onDownloadClick}>
              <CloudDownloadIcon sx={{ color: `${color?.grayShade3}` }} />
            </ButtonBase>
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
          <Box
            sx={{
              width: "180px",
            }}
          >
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
          <Box
            sx={{
              width: "180px",
            }}
          >
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
        </Stack>
      </SubTitleBarContainer>
    </>
  );
};

export default OCRTableFiltersMissingSK;
