// import { PrimeReactProvider } from "primereact/api";
// import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
// // import "primeflex/primeflex.css"; // css utility
// // import "primeicons/primeicons.css";
// import "primereact/resources/primereact.css"; //
// import ToastEle from "../Components/Toast";

import { cookies } from "next/headers";

// import React, { useEffect, useState } from "react";
import "./page.scss";

import Card from "./Card";
import { HOST } from "../constants";
import PageNavigation from "../components/PageNavigation";
import { connectToDb } from "../_lib/db";

// const CardArray = Array(10)
//   .fill(0)
//   .map(() => {
//     return <Card />;
//   });

const ShowSchools = (props) => {
  const cookieStore = cookies();
  console.log(cookieStore.get("results"));

  const getSchoolDataArray = async () => {
    const { dbConnection, err } = await connectToDb();

    if (err) {
      console.log("err: ", err);
      throw err;
    }

    try {
      const schoolDataArrayCursor = dbConnection.collection("schools").find();

      const schoolDataArray = await schoolDataArrayCursor.toArray();

      // console.log("schoolDataArrayCursor: ", schoolDataArrayCursor);

      const collections = await dbConnection.collections();

      if (!collections || collections.length === 0) {
        throw new Error("something wrong");
      }

      if (schoolDataArray.length === 0) {
        throw new Error("not found");
      }

      const CardArray = schoolDataArray.map((obj, i) => {
        const { schoolName, address, city, imageAttachment } = obj;
        return (
          <Card
            key={i}
            name={schoolName}
            address={address}
            city={city}
            image={imageAttachment}
          />
        );
      });

      return CardArray;
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="ShowSchools">
      <div className="heading">
        <h1> Schools</h1>
      </div>
      {/* <div className="container-wrapper"> */}
      <div className="container">
        {/* <Card /> */}
        {getSchoolDataArray()}
      </div>
      {/* </div> */}
    </div>
  );
};

export default ShowSchools;
