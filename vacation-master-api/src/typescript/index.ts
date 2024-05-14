import express from 'express';
import User from './types/User.js';
import { getUser, storeUser } from './client.js';

const PORT = 8080
const app = express()

app.use(express.json())

app.post('/signup', async (req, res) => {
    const user = User.fromObject(req.body)
    
    console.log(`signup request from ${user.name}`)

    const logedUser = await storeUser(user)

    res.status(200).send({
        signup: "success",
        data: logedUser
    })
})

app.get('/user/:id', async (req, res) => {
    const user_id = req.params.id
    
    const user = await getUser(user_id)

    if (user == null)
    {
        res.status(404).send(
            {message: 'User not found'}
        )
    } 
    else
    {
        res.status(200).send(
            {
                user: user
            }
        )
    } 
})

app.listen(
    PORT,
    () => { console.log(`listening on port: ${PORT}`) }
)

