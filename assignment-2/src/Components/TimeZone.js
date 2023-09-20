import React, { useEffect, useState } from "react";
import moment from "moment-timezone";
import ClayCard from "@clayui/card";
import ClayButton from "@clayui/button";
import { useNavigate } from "react-router-dom";
import { ClayToggle } from "@clayui/form";

const TimeZone = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [toggled, setToggle] = useState(false);
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(
    toggled
      ? moment().tz(userInfo.prefferdTimeZone).format("h:mm:ss A")
      : moment().tz(userInfo.prefferdTimeZone).format("HH:mm:ss")
  );
  const [currentDate, setCurrentDate] = useState(
    moment().tz(userInfo.prefferdTimeZone).format("MMMM D, YYYY")
  );
  const [showLogOut, setShowLogOut] = useState(false);
  const handelClick = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        toggled
          ? moment().tz(userInfo.prefferdTimeZone).format("h:mm:ss A")
          : moment().tz(userInfo.prefferdTimeZone).format("HH:mm:ss")
      );
      setCurrentDate(
        moment().tz(userInfo.prefferdTimeZone).format("MMMM D, YYYY")
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime, currentDate]);
  useEffect(() => {
    setCurrentTime(
      toggled
        ? moment().tz(userInfo.prefferdTimeZone).format("h:mm:ss A")
        : moment().tz(userInfo.prefferdTimeZone).format("HH:mm:ss")
    );
  }, [toggled]);
  return (
    <>
      <div className="d-flex flex-sm-row justify-content-between bg-gray mt-5 text-center ml-5">
        <ClayCard>
          <ClayCard.Body>
            <ClayCard.Description displayType="title" className="text-10">
              My TimeZone Eg : {userInfo.prefferdTimeZone}
            </ClayCard.Description>
            <ClayCard.Description
              truncate={false}
              displayType="text"
              className="text-5"
            >
              {currentDate} {currentTime}
            </ClayCard.Description>
          </ClayCard.Body>
        </ClayCard>
        <div className="mr-3 h-75 d-flex flex-sm-column">
          <ClayButton
            displayType="secondary"
            onClick={() => setShowLogOut(!showLogOut)}
          >
            {userInfo.name}
          </ClayButton>
          {showLogOut && (
            <ClayButton
              displayType="secondary"
              className="mr-2 mt-2"
              onClick={() => handelClick()}
            >
              Logout
            </ClayButton>
          )}
        </div>
      </div>

      <div className="mt-5 ml-5">
        <ClayToggle
          label={toggled ? "Change in to 24 hour" : "Change in to 12 hour"}
          onToggle={() => setToggle(!toggled)}
          toggled={toggled}
        />
      </div>
    </>
  );
};

export default TimeZone;
