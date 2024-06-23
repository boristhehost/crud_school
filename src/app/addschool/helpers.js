import { HOST } from "../constants";

// const AreStringsEmpty = (arr) => {
//   const emptyStringTypes = [];

//   for (let strObj of arr) {
//     // console.log()
//     const str = strObj["str"];
//     const type = strObj["type"];
//     if (type === "image") {
//       continue;
//     }
//     console.log("str: ", str);
//     if (!str || str.length == 0) {
//       console.log(`${type} is empty`);
//       emptyStringTypes.push(type);
//     }
//   }

//   return emptyStringTypes;
// };

const AreStringsEmpty = (...arr) => {
  const emptyStringTypes = [];

  for (let strObj of arr) {
    const { type, str } = strObj;

    console.log("str: ", str);
    if (!str || str.length == 0) {
      console.log(`${type} is empty`);
      emptyStringTypes.push(type);
    }
  }

  return emptyStringTypes;
};

const isValidEmailAddress = (email) => {
  const regex = /.+@.+\..+/;
  if (regex.test(email)) return true;
  return false;
};

const isFileImage = (file) => {
  return file && file["type"].split("/")[0] === "image";
};

const sendData = (
  data,
  setErrorMessage,
  setErrorVisibility,
  setToastStatus
) => {
  const formData = new FormData();
  for (let type in data) {
    const key = type;
    const value = data[type];

    formData.append(key, value);
  }
  console.log(formData);

  fetch(`${HOST}/addSchool`, {
    method: "POST",
    mode: "cors",

    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data?.status === "ok") {
        console.log("success");
        setErrorMessage("School data added successfully");
        setErrorVisibility(true);
        setToastStatus("success");
      } else {
        console.log("something wrong");
        setErrorMessage("something wrong");
        setErrorVisibility(true);
      }
    })
    .catch((err) => {
      console.error("err: ", err);
      console.log("some error");
      setErrorMessage("some error");
      setErrorVisibility(true);
    });
};

const verifyFields = (formData) => {
  const schoolName = formData.get("schoolName");
  const city = formData.get("city");
  const address = formData.get("address");
  const state = formData.get("state");
  const contactNumber = formData.get("contactNumber");
  const email = formData.get("email");
  const imageAttachment = formData.get("imageAttachment");

  const stringsObjArray = [
    { type: "schoolName", str: schoolName },
    { type: "city", str: city },
    { type: "address", str: address },
    { type: "state", str: state },
    { type: "contactNumber", str: contactNumber },
    { type: "email", str: email },
  ];

  const emptyTypes = AreStringsEmpty(...stringsObjArray);

  console.log("emptyTypes: ", emptyTypes);

  if (emptyTypes.length > 0) {
    return {
      message: `Make sure to fill all the fields. Fields ${emptyTypes.join(
        ","
      )} are empty`,
      status: 400,
    };
  }

  if (!isValidEmailAddress(email)) {
    console.log("invalid email");
    return {
      status: 400,
      message: "Invalid email address",
    };
  }

  // file should exist then check its type
  if (imageAttachment.size != 0 && !isFileImage(imageAttachment)) {
    console.log("invalid file type");
    return {
      status: 400,
      message: "Make sure that uploaded file is an image",
    };
    // setErrorMessage("Make sure that uploaded file is an image");
    // setErrorVisibility(true);
    // return;
  }

  return { status: 200, message: "school successfully added" };
};

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export {
  AreStringsEmpty,
  isValidEmailAddress,
  isFileImage,
  sendData,
  verifyFields,
  generateRandomString,
};
