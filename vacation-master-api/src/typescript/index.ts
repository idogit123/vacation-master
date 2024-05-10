import { getPet } from "./client.js";
import express from 'express'

const PORT = 8080
const app = express()

app.use(express.json())

app.get('/test', async (req, res) => {
    console.log(`request recived from ${req.headers.origin || "Unknown"}`)

    res.status(200).send(
        {test: "success"}
    )
})

app.post('/signup', async (req, res) => {
    const { name: user } = req.body
    console.log(`signup request from ${user}`)
    res.status(200).send({
        signup: "success",
        data: req.body
    })
})

app.listen(
    PORT,
    () => { console.log(`listening on port: ${PORT}`) }
)

