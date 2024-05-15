import express from 'express';
import User from './types/User.js';
import { storeUser } from './client.js';
const PORT = 8080;
const app = express();
app.use(express.json());
app.post('/signup', async (req, res) => {
    const user = User.fromObject(req.body);
    console.log(`signup request from ${user.name}`);
    const logedUser = await storeUser(user);
    res.status(200).send({
        signup: "success",
        data: logedUser
    });
});
app.post('/new', async (req, res) => {
    req.body;
});
app.listen(PORT, () => { console.log(`listening on port: ${PORT}`); });
