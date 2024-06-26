import express from 'express';
import { User } from './types/User.js';
import { postRequest, storeUser, getUser, getVacations, getEmployees, recruitEmployee, getManagerRequests, setRequestStatus } from './client.js';
const PORT = 8080;
const app = express();
app.use(express.json());
app.post('/signup', async ({ body: { name, password, role } }, res) => {
    const user = new User(name, password, role, "").getRole();
    console.log(`signup request from ${user.name}`);
    const logedUser = await storeUser(user);
    res.status(200).send({
        user: logedUser
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
    if (await postRequest(new Date(startDate), new Date(endDate), user_id)) {
        console.log('succesfuly uploaded new request');
        res.status(200).send({ success: true });
    }
    else {
        console.log('error posting request');
        res.status(404).send({ success: false });
    }
});
app.get('/vacations/:id', async (req, res) => {
    const vacations = await getVacations(req.params.id);
    if (vacations == null)
        res.status(404).send('no vacations found');
    else
        res.status(200).send(vacations);
});
app.get('/employees/:manager_id', async (req, res) => {
    res.status(200).send(await getEmployees(req.params.manager_id));
});
app.put('/recruit/:employee_id', async (req, res) => {
    if (await recruitEmployee(req.params.employee_id, req.query.manager_id))
        res.status(200).send();
    else
        res.status(404).send({ message: 'Employee not found' });
});
app.get('/requests/:manager_id', async (req, res) => {
    const requests = await getManagerRequests(req.params.manager_id);
    if (requests)
        res.status(200).send(requests);
    else
        res.status(404).send({ error: 'user not found' });
});
app.patch('/status/:request_id', async (req, res) => {
    console.log('set status');
    const isStatusSet = await setRequestStatus('VacationRequests/' + req.params.request_id, req.query.status);
    if (isStatusSet)
        res.status(200).send();
    else
        res.status(404).send('Request not found');
});
app.listen(PORT, () => { console.log(`listening on port: ${PORT}`); });
