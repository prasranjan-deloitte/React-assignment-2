import React, { useState } from "react";
import Button from "@clayui/button";
import DropDown from "@clayui/drop-down";
import ClayCard from "@clayui/card";
import ClayButton from "@clayui/button";
import { ClaySelect } from "@clayui/form";
import ClayForm, { ClayInput } from "@clayui/form";
import {
  createBrowserRouter,
  useNavigate,
  RouterProvider,
} from "react-router-dom";

// Imports the @clayui/css package CSS
import "@clayui/css/lib/css/atlas.css";
import TimeZone from "./Components/TimeZone";
function AppLayOut() {
  const getData = JSON.parse(localStorage.getItem("userInfo"));
  let dummyTImeZone = getData === null ? "" : getData.prefferdTimeZone;

  const [prefferdTimeZone, setPefferedTimeZone] = useState(dummyTImeZone);

  let dummyName = getData === null ? "" : getData.name;
  const [name, setName] = useState(dummyName);
  const [showError, setShowError] = useState(false);

  // console.log(prefferdTimeZone, name, dummyTImeZone, dummyName);
  const navigate = useNavigate();
  const options = [
    {
      label: "IST",
      value: "Asia/Kolkata",
    },
    {
      label: "UTC",
      value: "Etc/UTC",
    },
    {
      label: "PST",
      value: "America/Los_Angeles",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || prefferdTimeZone.length === 0) {
      setShowError(true);
    } else {
      setShowError(false);
      console.log(
        "name.length=",
        name.length,
        "preferred=",
        prefferdTimeZone.length
      );

      const userInfo = {
        name: name,
        prefferdTimeZone: prefferdTimeZone,
      };

      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      navigate("/userInfo");
    }
  };

  return (
    <>
      <ClayForm.Group className="col-md-5">
        <label htmlFor="basicInputText">Name</label>
        <ClayInput
          id="basicInputText"
          placeholder="Insert your name here"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {showError && <div className="text-red">PLease add your name</div>}

        <ClaySelect
          aria-label="Select Label"
          id="mySelectId"
          className="mt-2"
          value={prefferdTimeZone}
          onChange={(e) => setPefferedTimeZone(e.target.value)}
        >
          {options.map((item) => (
            <ClaySelect.Option
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </ClaySelect>
        {showError && (
          <div className="text-red">Please select your timezone </div>
        )}

        <ClayButton
          type="submit"
          className="w-100 mt-2"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </ClayButton>
      </ClayForm.Group>
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayOut />,
  },
  {
    path: "/userInfo",
    element: <TimeZone />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
