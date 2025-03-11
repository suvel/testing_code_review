import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Stack, styled, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import AlertCircleDanger from "../../../assets/images/alert-circle-danger.png";
import CheckCircleFilledTick from "../../../assets/images/CheckCircleFilled-tick.png";
import connectingSymbol from "../../../assets/images/connectingSymbol.png";
import Flight_Horizontal from "../../../assets/images/Flight_Horizontal.png";
import color from "../../../components/common/colors.json";
import SKComparingTable from "./SKComparingTable";
import { getUploadedDateAndTimeFormate } from "../utils/helper";

const getFormattedDate = (date) => {
  if (!date) return "";
  const formattedDate = `${date.toLocaleString("en-US", {
    day: "2-digit",
  })} ${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.toLocaleString("en-US", {
    year: "2-digit",
  })}`;
  return formattedDate;
};

const BolderLabelTypography = styled(Typography)({
  fontSize: "16px",
  fontWeight: "500",
  lineHeight: "18px",
  color: color.grayShade3,
});

const GrayValueTypography = styled(Typography)({
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "18px",
  color: color.darkGrayShade1,
});

const CountryCodeTypography = styled(Typography)({
  fontSize: "26px",
  fontWeight: "700",
  lineHeight: "31.2px",
});

const OCRDetailSidebar = ({ show, onClose, data }) => {
  const dataMatch = data?.matchOrNotMatch === "match";
  return (
    <Drawer anchor="right" open={show} onClose={onClose}>
      <Stack
        style={{
          width: "600px",
          height: "calc(100vh - 80px)",
          marginTop: "80px",
        }}
      >
        <Box>
          <IconButton
            style={{ float: "right", padding: "20px 30px 15px 30px" }}
            onClick={onClose}
            size="large">
            <CloseIcon />
          </IconButton>
        </Box>
        <Stack style={{ padding: "20px 30px 30px 30px" }} gap={"30px"}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <BolderLabelTypography>AWB number :</BolderLabelTypography>
            </Box>
            <Box>
              <GrayValueTypography>{data?.awb}</GrayValueTypography>
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            style={{
              padding: "5px 30px 15px 30px",
              height: "90px",
              borderTop: `1px dashed ${color.grayShade1}`,
              borderBottom: `1px dashed ${color.grayShade1}`,
            }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack direction={"row"} gap={"15px"} alignItems={"center"}>
              <Box>
                <CountryCodeTypography>{data?.origin}</CountryCodeTypography>
              </Box>
              <img src={connectingSymbol} width={"140px"} height={"10px"} />
            </Stack>
            <Stack
              alignItems={"center"}
              sx={{ height: "70px", padding: "25px 0px 0px 0px" }}
            >
              <Box>
                <img src={Flight_Horizontal} width="18px" height="18px" />
              </Box>
              <Box>
                <GrayValueTypography>{data?.flightNumber}</GrayValueTypography>
              </Box>
            </Stack>
            <Stack direction={"row"} gap={"15px"} alignItems={"center"}>
              <img src={connectingSymbol} width={"140px"} height={"10px"} />
              <Box>
                <CountryCodeTypography>
                  {data?.destination}
                </CountryCodeTypography>
              </Box>
            </Stack>
          </Stack>
          <Stack gap={"35px"}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Box>
                <BolderLabelTypography>Flight date :</BolderLabelTypography>
              </Box>
              <Box>
                <GrayValueTypography>
                  {getFormattedDate(data?.flightDate)}
                </GrayValueTypography>
              </Box>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Box>
                <BolderLabelTypography>Created by :</BolderLabelTypography>
              </Box>
              <Box>
                <GrayValueTypography>{data?.createdBy || 'N/A'}</GrayValueTypography>
              </Box>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Box>
                <BolderLabelTypography>Created date :</BolderLabelTypography>
              </Box>
              <Box>
                <GrayValueTypography>
                  {data?.createdDate ? getUploadedDateAndTimeFormate(data?.createdDate) : 'N/A'}
                </GrayValueTypography>
              </Box>
            </Stack>
          </Stack>
          <Stack sx={{ marginTop: "50px" }} gap={"20px"}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Stack>
                <SKComparingTable
                  label={"Pieces"}
                  skValue={data?.piecesSK}
                  ocrValue={data?.piecesOCR}
                />
              </Stack>
              <Stack>
                <SKComparingTable
                  label={"Chargeable Weight"}
                  unit={"kg"}
                  skValue={data?.cwSK}
                  ocrValue={data?.cwOCR}
                />
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent={"space-between"}>
              <Stack>
                <SKComparingTable
                  label={"Gross Weight"}
                  unit={"kg"}
                  skValue={data?.gwSK}
                  ocrValue={data?.gwOCR}
                />
              </Stack>
              {/* <Stack>
                <SKComparingTable
                  label={"Volumetric Weight"}
                  unit={"kg"}
                  skValue={data?.vwSK}
                  ocrValue={data?.vwOCR}
                />
              </Stack> */}
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{ marginTop: "auto", padding: "10px" }}
          justifyContent={"center"}
          gap={"9px"}
          direction={"row"}
        >
          <img src={dataMatch ? CheckCircleFilledTick : AlertCircleDanger} />

          <Typography
            fontSize={"22px"}
            fontWeight={"600"}
            color={dataMatch ? color.greenColor : color.customRedColor}
          >
            {dataMatch ? "Match" : "NO-Match"}
          </Typography>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default OCRDetailSidebar;
