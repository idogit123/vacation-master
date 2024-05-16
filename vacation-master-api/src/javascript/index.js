import express from 'express';
import { User } from './types/User.js';
import { postRequest, storeUser, getUser, getVacations, getEmployees } from './client.js';
const PORT = 8080;
const app = express();
app.use(express.json());
app.post('/signup', async ({ body: { name, password, role } }, res) => {
    const user = new User(name, password, role, "").getRole();
    console.log(`signup request from ${user.name}`);
    const logedUser = await storeUser(user);
    res.status(200).send({
        data: logedUser
    });
});
app.get('/login/:name', async (req, res) => {
    const user = {
        name: req.params.name,
        password: req.query.password
    };
    console.log(`login request from ${user.name}`);
    const logedUser = await getUser(user);
    if (logedUser.error)
        res.status(404).send(logedUser);
    else
        res.status(200).send(logedUser);
});
app.post('/new', async (req, res) => {
    const { startDate, endDate, user_id } = req.body;
    await postRequest(new Date(startDate), new Date(endDate), user_id);
    res.status(200).send({ success: true });
});
app.get('/vacations/:id', async (req, res) => {
    const vacations = await getVacations(req.params.id);
    if (vacations == null)
        res.status(404).send('no vacations found');
    else
        res.status(200).send(vacations);
});
app.get('/employees/:manager_id', async (req, res) => {
    const manager = req.params.manager_id;
    const employees = await getEmployees(manager);
    res.status(200).send(employees);
});
app.listen(PORT, () => { console.log(`listening on port: ${PORT}`); });
