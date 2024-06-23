import { IMAGE_DIRECTORY_PATH } from "@/app/constants";
import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
  const filePath = path.join(
    process.cwd(),
    IMAGE_DIRECTORY_PATH,
    // params.id + ".png"
    params.id
  );

  const extension = params.id.split(".")?.[1];

  console.log(filePath);

  const isFileExist = fs.existsSync(filePath);

  if (!isFileExist) {
    return new Response("not found", { status: 404 });
  }

  try {
    const file = fs.readFileSync(filePath);
    console.log(file);
    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": `image/${extension}`,
      },
    });
  } catch (err) {
    return new Response("error", { status: 500 });
  }
}
