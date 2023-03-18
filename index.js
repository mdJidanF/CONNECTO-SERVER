const express = require("express")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors")

const app = express()
const port = process.env.PORT || 5000

// middle wares
app.use(express.json())
app.use(cors())

// mjidan768
// 7LiCEiMRG71tznnr



const uri = "mongodb+srv://mjidan768:7LiCEiMRG71tznnr@cluster0.69nknyv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const districtCollection = client.db("connectionDB").collection("all-districts")

        // get all districts
        app.get("/all-districts", async (req, res) => {
            const query = {}
            const result = await districtCollection.find(query).toArray()
            res.send(result)
        })

        // get districts by division
        app.get("/all-districts/:division", async (req, res) => {
            const division = req.params.division
            console.log(division)
            const query = { division: division }
            const result = await districtCollection.find(query).toArray()
            res.send(result)
        })

        // Get a district by id
        app.get("/district/:id", async (req, res) => {
            const id = req.params.id
            console.log(id)
            const query = { _id: new ObjectId(id) }
            const result = await districtCollection.findOne(query)
            res.send(result)
        })



    } catch (error) {

    }
}

run().catch(err => console.log(err))


app.get("/", (req, res) => {
    res.send("SERVER IS RUNNING")
})

app.listen(port, () => {
    console.log("SERVER IS RUNNING OP PORT", port)
})