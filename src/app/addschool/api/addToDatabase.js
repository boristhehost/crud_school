const { connectToDb } = require("@/app/_lib/db");

const AddToDatabase = async (formData, imageUrl) => {
  const schoolName = formData.get("schoolName");
  const city = formData.get("city");
  const address = formData.get("address");
  const state = formData.get("state");
  const contactNumber = formData.get("contactNumber");
  const email = formData.get("email");
  const imageAttachment = formData.get("imageAttachment");

  const { dbConnection, err } = await connectToDb();

  if (err) {
    console.log("err: ", err);
    throw err;
  }

  try {
    const insertedResults = await dbConnection.collection("schools").insertOne({
      schoolName,
      city,
      address,
      state,
      contactNumber,
      email,
      imageAttachment: { imageUrl, ogName: imageAttachment.name },
    });

    return insertedResults;
  } catch (error) {
    throw error;
  }
};

export { AddToDatabase };
