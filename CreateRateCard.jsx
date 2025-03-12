import { useContext, useEffect, useState } from "react";

import RateCardAccordion from "../../features/RateCard/components/CreateRateCard/Accordion";
import { useNavigate, useParams } from "react-router-dom";
import { RateCardContext } from "../../context/ratecardContext";
import json from "../../features/RateCard/utils/rateCardJson.json";
import { getRateLine } from "../../api/ratecardApi";
import Loader from "../../components/common/loader/loader";
import processRawRateLineJson from "../../features/RateCard/functions/RateCard/processRawRateLineJson";
import '../../features/RateCard/styles/createRateCardFormStyle.css'
import ErrorMessage from "../../components/common/alert/deleteAlert";

const CreateRateCard = ({ viewOnly }) => {
  let navigate = useNavigate();
  const [errors, setErrors] = useState(false);
  const { formik, rateCardConstants } = useContext(RateCardContext);
  const [loading, setLoading] = useState(false);
  let { customerName, rateLineId } = useParams();
  customerName = customerName?.split("&")[0];
  rateLineId = rateLineId?.split("&")[0];

  useEffect(() => {
    const fetchRateLineData = async () => {
      try {
        setLoading(true);
        const rateLineData = await getRateLine(rateLineId);
        const processedRateLineJson = processRawRateLineJson(
          rateLineData,
          rateCardConstants,
        );
        formik.setValues(processedRateLineJson);
        if(rateLineData.length == 0) {setErrors(true);}
        setLoading(false);
      } catch (error) {
        setErrors(true);
        setLoading(false); // stop loading in case of an error
      }
    };

    if (!formik?.vaules?.id && viewOnly === true && rateLineId) {
      fetchRateLineData();
    }

    return () => {
      //initiating the previous json data
      formik.setValues(json);
      formik.setErrors({});
      // removeBc(["rateCard_rateLine", "rateCard_createRateCard"]);
    };
  }, []);
  return (
    <div>
      <Loader open={loading} />
      <RateCardAccordion isViewMode={viewOnly === true} />
      <ErrorMessage
        open={errors}
        title={"Rate Card Error"}
        body={"Error while fetching rateLine details"}
        type="error"
        btn2="OK"
        bodyPadding="20px 20px 61px"
        popupClose={() => {
          setErrors(false);
          navigate(-1);
        }}
      />
    </div>
  );
};

export default CreateRateCard;
