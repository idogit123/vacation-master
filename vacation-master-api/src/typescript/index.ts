import express from 'express';
import { User } from './types/User.js';
import { postRequest, storeUser, getUser } from './client.js';

const PORT = 8080
const app = express()

app.use(express.json())

app.post('/signup', async ({ body: {name, password, role} }, res) => {
    const user = new User(
        name, password, role, ""
    ).getRole()
    
    console.log(`signup request from ${user.name}`)

    const logedUser = await storeUser(user)

    res.status(200).send({
        data: logedUser
    })
})

app.get('/login/:name', async (req, res) => {
    const user = {
        name: req.params.name as string,
        password: req.query.password as string
    }

    console.log(`login request from ${user.name}`)

    const logedUser = await getUser(user)

    if (logedUser.error)
        res.status(404).send(
            logedUser as { error: string }
        )
    
    else 
        res.status(200).send(
            logedUser as { data: User }
        )
})

app.post('/new', async (req, res) => {
    const { startDate, endDate, user_id } = req.body
    const userRequests = await postRequest(
        new Date(startDate),
        new Date(endDate),
        user_id
    )

    if (userRequests == null)
        res.status(404).send('User not found')

    res.status(200).send({
        vacationRequests: userRequests
    })
})

app.listen(
    PORT,
    () => { console.log(`listening on port: ${PORT}`) }
)

