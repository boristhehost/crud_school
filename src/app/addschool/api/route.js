// import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";

import { generateRandomString, verifyFields } from "../helpers";
import { IMAGE_DIRECTORY_PATH } from "@/app/constants";
import { AddToDatabase } from "./addToDatabase";

export async function POST(request) {
  //   console.log("request: ", request.body);

  let imageUrl = "";

  console.log(process.env.BLOB_READ_WRITE_TOKEN);

  const formData = await request.formData();

  console.log(formData);

  const number = formData.get("contactNumber");

  const file = formData.get("imageAttachment");

  const { message, status } = verifyFields(formData);

  console.log("file: ", file);

  let fileName = generateRandomString(10);

  if (file?.size !== 0 && status < 400) {
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    console.log("fileBuffer: ", fileBuffer);

    console.log("dirname: ", __dirname);
    console.log("path: ", `${__dirname}/${file.name}`);

    fileName += "." + file.type.split("/")[1];

    console.log(fileName);

    const { url } = await put(`images/${fileName}`, file, {
      access: "public",
    });

    imageUrl = url;

    console.log("imageUrl: ", imageUrl);

    // const filePath = path.join(process.cwd(), IMAGE_DIRECTORY_PATH, fileName);

    // fs.writeFileSync(filePath, fileBuffer);
  }

  console.log("number ", number);

  //   redirect("/addschool");

  let insertResultStatus = "";

  if (status < 400) {
    console.log("adding school data");

    try {
      insertResultStatus = await AddToDatabase(formData, imageUrl);
    } catch (err) {
      console.log(err);
      return new Response(JSON.stringify({ message: "some error" }), {
        status: 500,
      });
    }
  }

  return new Response(JSON.stringify({ message, insertResultStatus }), {
    status,
  });
}
