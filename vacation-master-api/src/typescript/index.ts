import express from 'express';
import { User } from './data_types.js';
import { storeUser } from './client.js';

const PORT = 8080
const app = express()

app.use(express.json())

app.post('/signup', async (req, res) => {
    const user = User.fromJson(req.body).getRole()
    
    console.log(`signup request from ${user.name}`)

    storeUser(user)

    res.status(200).send({
        signup: "success",
        data: user
    })
})

app.listen(
    PORT,
    () => { console.log(`listening on port: ${PORT}`) }
)

