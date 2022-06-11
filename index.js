
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k2nsb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);
async function run() {
    try{
        await client.connect();
        const itemCollection = client.db('fruitWarehouse').collection('items');
        app.get('/items', async(req, res) =>{
            const query = {};
        const cursor = itemCollection.find(query);
        const item = await cursor.toArray();
        res.send(item);
        });
        app.get('/items/:id', async(req, res) =>{
           const id = req.params.id; 
           const query={_id: ObjectId(id)};
           const item = await itemCollection.findOne(query);
           res.send(item);
        })
    }
    finally{

    }
}

run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send('Reaning warehouse Server Site again')
});
app.listen(port, () =>{
    console.log('Listening to The port', port);
})
module.exports = app;