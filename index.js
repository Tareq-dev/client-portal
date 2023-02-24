const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

// user - tareq
// pass - g38KieFIn2SqGQX1

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://tareq:g38KieFIn2SqGQX1@cluster0.icdkmmf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const clientsCollection = client.db("client-portal").collection("clients");
    const ordersCollection = client.db("client-portal").collection("orders");

    //GET Client
    app.get("/client", async (req, res) => {
      const query = {};
      const cursor = clientsCollection.find(query);
      const client = await cursor.toArray();
      res.send(client);
    });

    //GET Order
    app.get("/order", async (req, res) => {
      const query = {};
      const cursor = ordersCollection.find(query);
      const order = await cursor.toArray();
      res.send(order);
    });

    //POST Client
    app.post("/client", async (req, res) => {
      const client = req.body;
      const result = await clientsCollection.insertOne(client);
      res.send(result);
    });
    //POST Order
    app.post("/order", async (req, res) => {
      const client = req.body;
      const result = await ordersCollection.insertOne(client);
      res.send(result);
    });

    //Delete
    app.delete("/client/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await clientsCollection.deleteOne(query);
      res.send(result);
    });
    // indivisual profile

    // app.get("/profile/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const user = await profileCollection.findOne({ email: email });
    //   res.send(user);
    // });

    // get
    // app.get("/posts/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: id };
    //   const post = await postCollection.findOne(query);
    //   res.send(post);
    // });

    // PUT
    // app.put("/profile/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const filter = { email: email };
    //   const profile = req.body;
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: {
    //       name: profile.name,
    //       address: profile.address,
    //       course: profile.course,
    //       picture: profile.picture,
    //       subject: profile.subject,
    //       university: profile.university,
    //     },
    //   };
    //   const result = await profileCollection.updateMany(
    //     filter,
    //     updateDoc,
    //     options
    //   );
    //   res.send(result);
    // });
  } finally {
    //
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running CLIENT");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
