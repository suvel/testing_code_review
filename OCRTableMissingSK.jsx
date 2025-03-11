import React from "react";

import ErrorIcon from "@mui/icons-material/Error";
import { Box, ButtonBase, Stack, styled, Typography } from "@mui/material";
import dayjs from "dayjs";
import MUIDataTable from "mui-datatables";

import fileDetailIcon from "../../../assets/images/File_Details.png";
import colors from "../../../components/common/colors.json";
import {
  TableHeader,
  TableHeaderStyle,
} from "../../../components/common/CustomTableComponent/index.js";
import Tooltip from "@mui/material/Tooltip";
import informationIcon from "../../../assets/images/InfoFilled.png";

import "../styles/ocrtable_missingSK.css";


const formateDateString = (flightDate) => {
  dayjs(flightDate).format("DD mmm YYYY");
  let formattedDate = dayjs(flightDate).format("DD MMM YYYY");
  return formattedDate;
};

const OCRTableMissingSK = ({
  tableData = [],
  page,
  pageSize,
  onChangePage,
  count,
  onDownloadAssert
}) => {
  const options = {
    responsive: "scrollMaxHeight",
      fixedHeader: true,
      fixedSelectColumn: true,
      tableBodyHeight: '90vh',
    serverSide: true,
    selectableRows: "none",
    elevation:0,
    filter: false,
    search: false,
    print: false,
    download: false,
    viewColumns: false,
    page: page,
    rowsPerPage: pageSize,
    count: count,
    rowsPerPageOptions: [10, 100, 200],
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          onChangePage(tableState.page, tableState.rowsPerPage);
          break;
        case "changeRowsPerPage":
          onChangePage(tableState.page, tableState.rowsPerPage);
          break;
      }
    },
  };

  const columns = [
    {

      
      name: "matchOrNotMatch",
      label: " ",
      options: {
        filter: false,
        sort: false,
        customHeadRender: (columnMeta) => (
          <TableHeaderStyle  style={{ position: "sticky",top: 0,}}> {columnMeta.label}</TableHeaderStyle>
        ),
        customBodyRender: () => 
          <Tooltip title={"Missing SK data"}>
            <div
            data-testid='nomatch_caution_icon'
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: colors.unharmfulRed,
            }}
            >
              <ErrorIcon />
            </div>
          </Tooltip>,
      },
    },
    {
      name: "awb",
      label: "AWB",
      options: {
        filter: false,
        sort: false,
        customHeadRender: (columnMeta) => (
          <TableHeaderStyle  style={{ position: "sticky",top: 0,}}> {columnMeta.label}</TableHeaderStyle>
        ),
        customBodyRender: (data) =>
          data ? (
            data
          ) : (
            <Typography color={colors.mouseGray}>{"Missing AWB"}</Typography>
          ),
      },
    },
    {
      name: "gcsUploadedAt",
      label: "Uploaded date",
      options: {
        filter: false,
        sort: false,
        customHeadRender: (columnMeta) => (
          <TableHeaderStyle style={{padding: "16px 0 16px 0",  position: "sticky",
            top: 0,}}> {columnMeta.label}</TableHeaderStyle>
        ),
        customBodyRender: (data) =>
          data? formateDateString(data):"N/A",
      },
    },
    {
      name: "pieces",
      label: <>{"Pieces"}</>,
      options: {
        filter: true,
        sort: false,
        customHeadRender: (columnMeta) => (
       <TableHeader
       isSticky={true}
            columnMeta={columnMeta}
            values={["OCR"]}
            centerAlignTableCell
          />
        ),
        customBodyRender: (data) =>
          data||"-",
      },
    },
    {
      name: "grossWeight",
      label: (
        <>
          GW(kg){" "}
          <Tooltip title={"Gross Weight"}>
            <img src={informationIcon} />
          </Tooltip>
        </>
      ),
      options: {
        filter: true,
        sort: false,
        customHeadRender: (columnMeta) => (
          <TableHeader
          isSticky={true}
            columnMeta={columnMeta}
            values={["OCR"]}
            centerAlignTableCell
          />
        ),
        customBodyRender: (data) =>
         data||"-",
      
       
      },
    },
    {
      name: "chargeableWeight",
      label: (
        <>
          CW(kg){" "}
          <Tooltip title={"Chargeable Weight"}>
            <img src={informationIcon} />
          </Tooltip>
        </>
      ),
      options: {
        filter: true,
        sort: false,
        customHeadRender: (columnMeta) => (
          <TableHeader
          isSticky={true}
            columnMeta={columnMeta}
            values={["OCR"]}
            centerAlignTableCell
          />
        ),
        customBodyRender: (data) =>
          data||"-",
      },
    },
    {
      name: "action",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customHeadRender: (columnMeta) => (
          <TableHeaderStyle   style={{ textAlign: "center", position: "sticky",top: 0,zIndex:99 }}>
            {columnMeta.label}
          </TableHeaderStyle>
        ),
        customBodyRender: (data, { rowIndex }) => (
          <Stack justifyContent={"center"} direction={"row"} gap="12px">
            <Box padding={'10px'}>
              <ButtonBase onClick={() => onDownloadAssert(tableData[rowIndex])}>
                <img src={fileDetailIcon} />
              </ButtonBase>
            </Box>
          </Stack>
        ),
    },
  }
  ];
  return (
    <div className="skMissing_table-container">
      <MUIDataTable
        tableId="skMissing_table"
        data={tableData}
        columns={columns}
        options={options}
      />
   </div>
  );
};

export default OCRTableMissingSK;
