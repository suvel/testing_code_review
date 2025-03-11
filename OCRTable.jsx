import React from "react";

import ErrorIcon from '@mui/icons-material/Error';
import { Box, ButtonBase, Checkbox, Stack, styled, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";

import Flight_Horizontal from "../../../assets/images/Flight_Horizontal.png";
import ViewInfoIcon from "../../../assets/images/ViewInfoIcon.png";
import colors from "../../../components/common/colors.json";
import {
  UnorderedList,
  TableHeaderStyle,
  TableHeader,
} from "../../../components/common/CustomTableComponent";
import "../styles/ocrtable.css";
import cautionIcon from "../../../assets/images/Infolist.png";
import informationIcon from "../../../assets/images/InfoFilled.png";
import Tooltip from "@mui/material/Tooltip";
import fileDetailIcon from "../../../assets/images/File_Details.png";
import { getPredictionDifference } from "../utils/helper";
import dayjs from "dayjs";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CenterAlignedListHeader = styled("div")({
  display: "flex",
  justifyContent: "left",
  textAlign: "center",
});

const getFlightDateString = (flightDate) => {
  dayjs(flightDate).format("DD mmm YYYY")
  let formattedDate = dayjs(flightDate).format("DD MMM YYYY");
  return formattedDate;
};

const AcceptedTable = ({ country, origin, flightNumber, flightDate }) => {
  const isCountryUnavailable = country === null;
  const isOriginUnavailable = origin === null;
  const isFlightUnavailable = flightNumber === null;
  const isDateUnavailable = flightDate === null;
  return (
    <CenterAlignedListHeader>
      <UnorderedList>
        <Stack alignItems={"center"}>
          {isCountryUnavailable ? (
            <div>
              <Tooltip title={"country not available"}>
                <img src={cautionIcon} />
              </Tooltip>
            </div>
          ) : (
            <div>{country}</div>
          )}
          <div style={{ height: "18px" }} />
        </Stack>
      </UnorderedList>
      <UnorderedList>
        <Stack alignItems={"center"}>
          {isOriginUnavailable ? (
            <div>
              <Tooltip title={"country not available"}>
                <img src={cautionIcon} />
              </Tooltip>
            </div>
          ) : (
            <div>{origin}</div>
          )}
          <div style={{ height: "18px" }} />
        </Stack>
      </UnorderedList>
      <UnorderedList>
        <Stack alignItems={"center"}>
          {isFlightUnavailable ? (
            <div>
              <Tooltip title={"country not available"}>
                <img src={cautionIcon} />
              </Tooltip>
            </div>
          ) : (
            <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
              <img src={Flight_Horizontal} /> {flightNumber}
            </Stack>
          )}
          <div style={{ height: "18px" }} />
        </Stack>
      </UnorderedList>
      <UnorderedList>
        <Stack alignItems={"center"}>
          {isDateUnavailable ? (
            <div>
              <Tooltip title={"country not available"}>
                <img src={cautionIcon} />
              </Tooltip>
            </div>
          ) : (
            <div>{flightDate}</div>
          )}
          <div style={{ height: "18px" }} />
        </Stack>
      </UnorderedList>
    </CenterAlignedListHeader>
  );
};

const SKComparingTable = ({ ocrValue, skValue, isInteger }) => {
  const isOcrUnavailable = ocrValue === null;
  const isSKUnavailable = skValue === null;
  return (
    <CenterAlignedListHeader>
      <UnorderedList>
        <Stack alignItems={"center"}>
          {isOcrUnavailable ? (
            <div>
              <Tooltip title={"Ocr failed due to bad image quality. Please upload again."}>
                <img src={cautionIcon} />
              </Tooltip>
            </div>
          ) : (
            <div>{ocrValue}</div>
          )}
          <div style={{ height: "18px" }} />
        </Stack>
      </UnorderedList>
      <UnorderedList>
        <Stack alignItems={"center"}>
          {isSKUnavailable ? (
            <div>
              <Tooltip title={"SK data not available"}>
                <img src={cautionIcon} />
              </Tooltip>
            </div>
          ) : (
            <>
              <div>{skValue}</div>
              {getPredictionDifference(skValue, ocrValue, isInteger)}
            </>
          )}
        </Stack>
      </UnorderedList>
    </CenterAlignedListHeader>
  );
};

const OCRTable = ({
  tableData = [],
  onShowDetails,
  onDownloadAssert,
  page,
  pageSize,
  onChangePage,
  count,
  handelOnVerifyCW,
  handelOnVerifySK
}) => {
  const options = {
    fixedHeader: true,
    fixedSelectColumn: true,
    elevation:0,
    tableBodyHeight: '90vh',
    responsive:"scrollMaxHeight",
    serverSide: true,
    selectableRows: "none",
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
        customBodyRender: (data) => {
          if (data === "nomatch")
            return (
              <Tooltip title={"Found SK and OCR data miss-match"}>
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
              </Tooltip>
            );
          return "";
        },
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
        customBodyRender: (data, { rowIndex }) =>
          data ? (
            data
          ) : (
            <Typography color={colors.mouseGray}>{"Missing AWB"}</Typography>
          ),
      },
    },
    {
      name: "accepted",
      label: <>{"Accepted"}</>,
      options: {
        filter: true,
        sort: false,
        customHeadRender: (columnMeta) => (
          <TableHeader
          isSticky={true}
            columnMeta={columnMeta}
            values={["Country", "Origin", "Flight", "Date"]}
            centerAlignTableCell
          />
        ),
        customBodyRender: (data, { rowIndex }) => (
          <AcceptedTable
            country={tableData[rowIndex]?.ilsOriginCountryCode}
            origin={tableData[rowIndex]?.origin}
            flightNumber={tableData[rowIndex]?.flightNumber}
            flightDate={getFlightDateString(tableData[rowIndex]?.flightDate)}
          />
        ),
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
            values={["OCR", "SK"]}
            centerAlignTableCell
          />
        ),
        customBodyRender: (data, { rowIndex }) => (
          <SKComparingTable
            skValue={tableData[rowIndex].piecesSK}
            ocrValue={tableData[rowIndex].piecesOCR}
            isInteger
          />
        ),
      },
    },
    {
      name: "gw",
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
            values={["OCR", "SK"]}
            centerAlignTableCell
          />
        ),
        customBodyRender: (data, { rowIndex }) => (
          <SKComparingTable
            skValue={tableData[rowIndex].gwSK}
            ocrValue={tableData[rowIndex].gwOCR}
          />
        ),
      },
    },
    {
      name: "cw",
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
            values={["OCR", "SK"]}
            centerAlignTableCell
          />
        ),
        customBodyRender: (data, { rowIndex }) => (
          <SKComparingTable
            skValue={tableData[rowIndex].cwSK}
            ocrValue={tableData[rowIndex].cwOCR}
          />
        ),
      },
    },
    {
      name: "action",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customHeadRender: (columnMeta) => (
          <TableHeaderStyle    style={{ textAlign: "center", position: "sticky",top: 0,zIndex:99 }}>
            {columnMeta.label}
          </TableHeaderStyle>
        ),
        customBodyRender: (data, { rowIndex }) => (
          <Stack justifyContent={"center"} direction={"row"} gap="12px">
            <Box>
              <Tooltip title={"Verify CW"}>
                <Checkbox data-testid='verify_cw_checkbox'  color="success" disabled={tableData[rowIndex]?.verifyCW}  onClick={()=>handelOnVerifyCW(tableData[rowIndex]?.awbSmartKargoOcrDocId)} checked={tableData[rowIndex]?.verifyCW} size="small" {...label} />
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={"Override SK"}>
                <Checkbox data-testid='verify_sw_checkbox' color="success" onClick={()=>handelOnVerifySK(tableData[rowIndex]?.awbSmartKargoOcrDocId)} disabled={!tableData[rowIndex]?.verifyCW || tableData[rowIndex]?.verifySK} checked={tableData[rowIndex]?.verifySK} size="small" {...label} />
              </Tooltip>
            </Box>
            <Box padding={'10px'}>
              <ButtonBase onClick={() => onShowDetails(tableData[rowIndex])}>
                <img src={ViewInfoIcon} />
              </ButtonBase>
            </Box>
            <Box padding={'10px'}>
              <ButtonBase onClick={() => onDownloadAssert(tableData[rowIndex])}>
                <img src={fileDetailIcon} />
              </ButtonBase>
            </Box>
          </Stack>
        ),
      },
    },
  ];
  return (
    <div className="ocr_listing_table-container">
      <MUIDataTable
        tableId="ocr_listing_table"
        data={tableData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default OCRTable;
