const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
// const uri = "mongodb+srv://moshiurmirage:Ms123456@cluster0.hhabjy4.mongodb.net/?retryWrites=true&w=majority";
const uri="mongodb://localhost:27017"

app.use(cors());
app.use(express.json());
// moshiurmirage
// Ms123456
app.get('/', (req, res) => {
  res.send('SIMPLE CRUD IS RUNNING');
})




// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const usersCollection = client.db("UsersDB").collection('users');


    app.get('/users', async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id:new ObjectId(id)}
      const result = await usersCollection.findOne(query)
      res.send(result)
    })


    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('new user', user)
      const result = await usersCollection.insertOne(user);
      res.send(result);
    })

    app.put('/users/:id',async (req,res)=>{
      const id = req.params.id;
      const updatingUser=req.body;
      console.log(updatingUser)
      const filter={_id:new ObjectId(id)}
      const options={upsert:true}
      const updatedUser={
        $set:{
          name:updatingUser.name,
          email:updatingUser.email
        }
      }
      const result = await usersCollection.updateOne(filter,updatedUser,options);
      res.send(result);
      console.log(result)

    })

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id)
      const query = { _id:new ObjectId(id)}
      const result = await usersCollection.deleteOne(query)
      res.send(result)
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`SIMPLE CRUD IS RUNNING ON PORT ${port}`);
})


