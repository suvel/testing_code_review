import React from "react";
import { Stack } from "@mui/material";

import ArrowDownwardFilledRed from "../../../assets/images/ArrowDownwardFilledRed.png";
import ArrowUpwardFilledGreen from "../../../assets/images/ArrowUpwardFilledGreen.png";
import color from '../../../components/common/colors.json'
import dayjs from "dayjs";

const getStartOCRDateStamp = (d) => {
    return `${d.format('YYYY-MM-DD')}T00:00:00.000Z`
}

const getEndDateOCRDateStamp = (d) => {
    return `${d.format('YYYY-MM-DD')}T23:59:59.999Z`
}


export const getOCRFilterPayload = (filterObject) => {
    let updatedFilter = {};
    let flag = false;
    if (filterObject.fromDate) {
        flag = true;
        updatedFilter = { ...updatedFilter, fromDate: getStartOCRDateStamp(filterObject.fromDate) };
    }
    if (filterObject.toDate) {
        flag = true;
        updatedFilter = { ...updatedFilter, toDate: getEndDateOCRDateStamp(filterObject.toDate) };
    }
    if (filterObject.awbNumber) {
        flag = true;
        const awbValue = filterObject?.awbNumber || '';
        updatedFilter = { ...updatedFilter, awbNumber: [awbValue] };
    }
    if (filterObject.origin) {
        flag = true;
        updatedFilter = { ...updatedFilter, origin: filterObject.origin };
    }
    if (filterObject.country) {
        flag = true;
        updatedFilter = {
            ...updatedFilter,
            country: filterObject.country,
        };
    }
    if (filterObject.flight) {
        flag = true;
        updatedFilter = {
            ...updatedFilter,
            flightNumber: filterObject.flight,
        };
    }
    if (filterObject.matchType) {
        if (filterObject.matchType === "match") {
            flag = true;
            updatedFilter = { ...updatedFilter, isAllCheckFieldsMatch: true };
        }
        if (filterObject.matchType === "no_match") {
            flag = true;
            updatedFilter = { ...updatedFilter, isAllCheckFieldsMatch: false };
        }
    } else {
        flag = true;
        updatedFilter = { ...updatedFilter, isAllCheckFieldsMatch: null };
    }
    return [updatedFilter, flag];
}

export const getPredictionDifference = (actual, expected, isInteger) => {
    if (!actual || !expected) return <></>;
    let diff;
    if (!isInteger) {
        diff = (Math.round((actual - expected) * 100) / 100).toFixed(2);
    } else {
        diff = (Math.round((actual - expected) * 100) / 100);
    }
    if (diff === '0.00' || diff === 0) return <></>
    else if (diff > 0) {
        return (
            <Stack
                style={{ color: color.greenColor, fontSize: "12px", fontWeight: "700" }}
                direction={"row"}
                alignItems={"center"}
            >
                {`+${diff}`}
                <img src={ArrowUpwardFilledGreen} />
            </Stack>
        );
    } else
        return (
            <Stack
                style={{ color: color.customRedColor, fontSize: "12px", fontWeight: "700" }}
                direction={"row"}
                alignItems={"center"}
            >
                {`${diff}`} <img src={ArrowDownwardFilledRed} />
            </Stack>
        );
};

export const getUploadedDateAndTimeFormate = (date) => {
    if (!date) return "";
    const formattedDate = `${date.toLocaleString("en-US", {
        day: "2-digit",
    })} ${date.toLocaleString("en-US", {
        month: "long",
    })} ${date.toLocaleString("en-US", {
        year: "2-digit",
    })} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    return formattedDate;
}

export function calculateEndDate(startDate, endDate, maxEndDate) {
    if (dayjs(endDate).isAfter(maxEndDate)) {
        return maxEndDate;
    } else {
        const ninetyTwoDays = dayjs(startDate).add(91, 'day');
        if (ninetyTwoDays.diff(startDate, "days") <= 91 && dayjs(ninetyTwoDays).isAfter(maxEndDate)) return maxEndDate;
        else return ninetyTwoDays;
    }
}

export const checkIsDateValid = (startDate, endDate, operationType) => {

    const today = dayjs();
    let invalid = false;
    let msg = null;
    let invalidType = null;
    const maxDayCountForView = 91;
    const maxDayCountForDownload = 31;
    if (!dayjs(startDate).isValid() || !dayjs(endDate).isValid()) {
        invalid = true;
        invalidType = 'formate-issue';
        msg = `Both dates are required, please use the formate "dd-mm-yyyy" to provide a valid date.`;
    }
    else if (dayjs(startDate).isAfter(today) || dayjs(endDate).isAfter(today)) {
        invalid = true;
        invalidType = 'maximum-date-override';
        msg = `The maximum date should be "today" of both the dates`;
    } else if (dayjs(startDate).isAfter(endDate)) {
        invalid = true;
        invalidType = 'date-range-missmatch';
        msg = 'Please check dates, Start Date cannot be more then End Date';
    }
    else if (operationType === 'viewData' && (endDate)?.diff(startDate, "days") > maxDayCountForView) {
        invalid = true;
        invalidType = 'not-matching-view-range';
        msg = `View is limited to a maximum ${maxDayCountForView}-day date range. Please adjust dates accordingly`
    }
    else if (operationType === 'downloadData' && (endDate)?.diff(startDate, "days") > maxDayCountForDownload) {
        invalid = true;
        invalidType = 'not-matching-download-range';
        msg = `Download is limited to a maximum ${maxDayCountForDownload}-day date range. Please adjust dates accordingly`
    }
    return { invalid, msg, invalidType };
}

export const parseOCRFilterData = (data) => {
    return {
        origins: data?.filter?.origin||[],
        countries: data?.filter?.country||[],
        flights: data?.filter?.flightNumber||[],
      };
};

export const handelClearFilter=(currentFilter, filterOptions)=>{
    let clonedFilter = {...currentFilter};
    let flag = false;
    if(filterOptions?.origins?.length===0){
      clonedFilter.origin =null;
      flag = true;
    }
    if(filterOptions?.countries?.length===0){
      clonedFilter.country =null;
      flag = true;
    }
    if(filterOptions?.flights?.length===0){
      clonedFilter.flightNumber =null;
      flag = true;
    }
    return [flag,clonedFilter];
}

