import React from "react";

import { Stack, styled, Typography } from "@mui/material";

import color from "../../../components/common/colors.json";
import cautionIcon from "../../../assets/images/Infolist.png";
import Tooltip from "@mui/material/Tooltip";
import { getPredictionDifference } from "../utils/helper";

const CustomTable = styled("table")({
  border: `1px solid ${color.lightGrayShade6}`,
  "border-collapse": "collapse",
  th: {
    border: `1px solid ${color.lightGrayShade6}`,
    "border-collapse": "collapse",
  },
  td: {
    border: `1px solid ${color.lightGrayShade6}`,
    "border-collapse": "collapse",
  },
});

const TableHeaderTypography = styled(Typography)({
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "18px",
});

const FixedTableData = styled("td")({
  padding: "10px 0px 10px 0px",
  height: "70px",
});

const FixedTableColData = styled("td")({
  padding: "10px 0px 10px 0px",
  height: "38px",
  width: "130px",
});

const SKComparingTable = ({ label, unit, skValue, ocrValue }) => {
  const isOcrUnavailable = ocrValue === null;
  const isSKUnavailable = skValue === null;
  return (
    <CustomTable
      style={{
        width: "260px",
        textAlign: "center",
      }}
    >
      <tr>
        <td
          style={{ padding: "10px 0px 10px 0px", height: "48px" }}
          colSpan="2"
        >
          <Stack direction={"row"} justifyContent={"center"}>
            <TableHeaderTypography color={color.darkGrayShade1}>
              {label}
            </TableHeaderTypography>
            <TableHeaderTypography color={color.grayColor}>
              {unit && `(${unit})`}
            </TableHeaderTypography>
          </Stack>
        </td>
      </tr>
      <tr>
        <FixedTableColData>
          <TableHeaderTypography color={color.grayColor}>
            OCR
          </TableHeaderTypography>
        </FixedTableColData>
        <FixedTableColData>
          <TableHeaderTypography color={color.grayColor}>
            SK
          </TableHeaderTypography>
        </FixedTableColData>
      </tr>
      <tr>
        <FixedTableData>
          <TableHeaderTypography color={color.darkGrayShade1}>
            {isOcrUnavailable ? (
              <>
                <Tooltip title={"Ocr failed due to bad image quality. Please upload again."}>
                  <img src={cautionIcon} />
                </Tooltip>
              </>
            ) : (
              ocrValue
            )}
          </TableHeaderTypography>
          <div style={{ height: "18px" }}></div>
        </FixedTableData>
        <FixedTableData>
          <Stack alignItems={"center"}>
            <TableHeaderTypography color={color.darkGrayShade1}>
              {isSKUnavailable ? (
                <>
                  <Tooltip title={"SK data not available"}>
                    <img src={cautionIcon} />
                  </Tooltip>
                </>
              ) : (
                skValue
              )}
            </TableHeaderTypography>
            <div style={{ height: "18px" }}>
              <TableHeaderTypography color={color.darkGrayShade1}>
                {getPredictionDifference(skValue, ocrValue)}
              </TableHeaderTypography>
            </div>
          </Stack>
        </FixedTableData>
      </tr>
    </CustomTable>
  );
};

export default SKComparingTable;
