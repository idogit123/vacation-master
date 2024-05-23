import { DocumentStore } from "ravendb";
import { readFileSync } from 'fs';
import { User } from "./types/User.js";
import { VacationRequest } from "./types/Request.js";
const authOptions = {
    certificate: readFileSync("./certificate/Client.pfx"),
    type: "pfx",
    password: "user123"
};
const documentStore = new DocumentStore("https://a.free.idodb.ravendb.cloud", "Vacation", authOptions);
documentStore.conventions.registerEntityType(User);
documentStore.initialize();
console.log("created a document store");
export async function storeUser(newUser) {
    const session = documentStore.openSession();
    const queryForExistingUser = session.query({ collection: 'Users' })
        .whereEquals('name', newUser.name);
    const existingUser = await queryForExistingUser.firstOrNull();
    if (existingUser == null) {
        const id = newUser.name.replaceAll(' ', '-').toLowerCase();
        await session.store(newUser, id, User);
        await session.saveChanges();
        return newUser;
    }
    await session.saveChanges();
    return existingUser;
}
export async function getUser(user) {
    const session = documentStore.openSession();
    const logedUser = await session.query({ collection: 'Users' })
        .whereEquals('name', user.name)
        .firstOrNull();
    await session.saveChanges();
    if (logedUser == null)
        return { error: 'User not found' };
    else if (logedUser.password == user.password)
        return { user: logedUser };
    else
        return { error: 'Password incorrect' };
}
export async function postRequest(startDate, endDate, user_id) {
    const session = documentStore.openSession();
    const user = await session.load(user_id);
    if (user == null || user.manager == null)
        return false;
    const request = new VacationRequest(user.manager, user_id, user.name, startDate, endDate, 'pending');
    await session.store(request, undefined, {
        documentType: VacationRequest
    });
    await session.saveChanges();
    return true;
}
export async function getVacations(user_id) {
    const session = documentStore.openSession();
    const vacations = await session.query({ collection: 'VacationRequests' })
        .whereEquals('employee_id', user_id)
        .all();
    await session.saveChanges();
    return vacations;
}
export async function getEmployees(manager_id) {
    const session = documentStore.openSession();
    const newEmployees = await session.query({ collection: 'Users' })
        .whereExists('manager')
        .whereEquals('manager', null)
        .lazily();
    const managerEmployees = await session.query({ collection: 'Users' })
        .whereExists('manager')
        .whereEquals('manager', manager_id)
        .lazily();
    session.saveChanges();
    return {
        newEmployees: await newEmployees.getValue(),
        managerEmployees: await managerEmployees.getValue()
    };
}
export async function recruitEmployee(employee_id, manager_id) {
    const session = documentStore.openSession();
    const employee = await session.load(employee_id);
    if (employee == null)
        return false;
    employee.manager = manager_id;
    await session.saveChanges();
    return true;
}
export async function getManagerRequests(manager_id) {
    const session = documentStore.openSession();
    const requests = await session.query({ collection: 'VacationRequests' })
        .whereEquals('manager_id', manager_id)
        .whereEquals('status', 'pending')
        .all();
    session.saveChanges();
    return requests;
}
export async function setRequestStatus(request_id, status) {
    const session = documentStore.openSession();
    console.log(request_id);
    const request = await session.load(request_id);
    if (request == null) {
        console.log('request not found');
        return false;
    }
    request.status = status;
    console.log(request.status);
    session.saveChanges();
    return true;
}
