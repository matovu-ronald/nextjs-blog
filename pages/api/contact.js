import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(
        "mongodb+srv://maron:ub0idDupmL4aBYRk@cluster0.2fgoy.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database" });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage._id = result.insertedId;
    } catch (error) {
      await client.close();
      res.status(500).json({ message: "Storing message failed!" });
    }

    await client.close();
    console.log(newMessage);

    res
      .status(201)
      .json({ message: "Successfully stored message", newMessage });
  }
}

export default handler;
