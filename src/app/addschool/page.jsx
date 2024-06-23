"use client";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
// import "primeflex/primeflex.css"; // css utility
// import "primeicons/primeicons.css";
import "primereact/resources/primereact.css"; //
import ToastEle from "../components/Toast";

// import { HOST } from "../constants";

import React, { useState, useEffect } from "react";
import "./page.scss";
import {
  AreStringsEmpty,
  isValidEmailAddress,
  isFileImage,
  sendData,
} from "./helpers";

import PageNavigation from "../components/PageNavigation";

const AddSchool = (props) => {
  // const [formData, setFormData] = useState({});
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toastStatus, setToastStatus] = useState("");

  // useEffect(() => {
  //   console.log("formData: ", formData);
  // }, [formData]);

  // const formSubmit = (e) => {
  //   e.preventDefault();
  //   const allTypes = ["name", "city", "address", "state", "contact", "email"];
  //   const fieldObjArr = [];
  //   for (let type of allTypes) {
  //     fieldObjArr.push({ type, str: formData[type] });
  //   }
  //   console.log("fieldObjArr: ", fieldObjArr);
  //   const emptyTypes = AreStringsEmpty(fieldObjArr);

  //   console.log("emptyTypes: ", emptyTypes);

  //   if (emptyTypes.length > 0) {
  //     alert(
  //       `Make sure to fill all the fields. Fields ${emptyTypes.join(
  //         ","
  //       )} are empty`
  //     );

  //     return;
  //   }

  //   if (!isValidEmailAddress(formData["email"])) {
  //     console.log("invalid email");
  //     setErrorMessage("Invalid email address");
  //     setErrorVisibility(true);
  //     return;
  //   }

  //   if (!isFileImage(formData["image"])) {
  //     console.log("invalid file type");
  //     setErrorMessage("Make sure that uploaded file is an image");
  //     setErrorVisibility(true);
  //     return;
  //   }

  //   sendData(formData, setErrorMessage, setErrorVisibility, setToastStatus);
  // };

  // const recordFormData = (e, type) => {
  //   const obj = { ...formData };
  //   if (type === "image") {
  //     // console.log("file: ", e.target.files[0]);
  //     obj[type] = e.target.files[0];
  //   } else {
  //     obj[type] = e.target.value;
  //   }

  //   setFormData(obj);
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const response = await fetch("/addschool/api", {
        method: "POST",
        body: formData,
      });

      const status = response.status;

      const data = await response.json();

      console.log(status, data);

      if (status >= 400) {
        setErrorMessage(data.message || "some error");
        setErrorVisibility(true);

        return;
      }

      setErrorMessage("School data added successfully");
      setErrorVisibility(true);
      setToastStatus("success");
    } catch (err) {
      setErrorMessage(data.message || "some error");
      setErrorVisibility(true);
    }
  };

  return (
    <div className="AddSchool">
      <PageNavigation pageName={"Show Schools"} link={"/ShowSchools"} />
      <PrimeReactProvider>
        <ToastEle
          errorVisibility={errorVisibility}
          errorMessage={errorMessage}
          setErrorVisibility={setErrorVisibility}
          setStatus={setToastStatus}
          status={toastStatus}
        />
      </PrimeReactProvider>
      {/* <form action="/addschool/api" method="POST"> */}
      <form onSubmit={onSubmit}>
        <h2>School Information Form</h2>
        <label for="schoolName">School Name</label>
        {/* <input type="text" id="schoolName" name="schoolName" required /> */}
        <input type="text" id="schoolName" name="schoolName" />

        <label for="city">City</label>
        {/* <input type="text" id="city" name="city" required /> */}
        <input type="text" id="city" name="city" />

        <label for="address">Address</label>
        {/* <textarea id="address" name="address" rows="3" required></textarea> */}
        <textarea id="address" name="address" rows="3"></textarea>

        <label for="state">State</label>
        {/* <input type="text" id="state" name="state" required /> */}
        <input type="text" id="state" name="state" />

        <label for="contactNumber">Contact Number</label>
        {/* <input
          type="tel"
          id="contactNumber"
          name="contactNumber"
          pattern="[0-9]{10}"
          required
        /> */}
        <input
          // type="tel"
          id="contactNumber"
          name="contactNumber"
          // pattern="[0-9]{10}"
          required
        />

        <label for="email">Email ID</label>
        {/* <input type="email" id="email" name="email" required /> */}
        <input type="email" id="email" name="email" />

        <label for="imageAttachment">Image Attachment</label>
        <input
          type="file"
          id="imageAttachment"
          name="imageAttachment"
          accept="image/*"
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddSchool;
