import { DocumentStore } from "ravendb";
import { readFileSync } from 'fs';
import { User } from "./types/User.js";
import VacationRequest from "./types/Request.js";
const authOptions = {
    certificate: readFileSync("./certificate/Client.pfx"),
    type: "pfx",
    password: "user123"
};
const documentStore = new DocumentStore("https://a.free.idodb.ravendb.cloud", "Vacation", authOptions);
documentStore.conventions.registerEntityType(User);
documentStore.initialize();
console.log("created a document store");
export async function storeUser(user) {
    const session = documentStore.openSession();
    const queryForExistingUser = session.query({ collection: 'Users' })
        .whereEquals('name', user.name);
    const existingUser = await queryForExistingUser.firstOrNull();
    if (existingUser == null) {
        const id = user.name.replaceAll(' ', '-').toLowerCase();
        await session.store(user, id, User);
        await session.saveChanges();
        return user;
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
        return { data: logedUser };
    else
        return { error: 'Password incorrect' };
}
export async function postRequest(startDate, endDate, user_id) {
    const session = documentStore.openSession();
    const request = new VacationRequest(user_id, startDate, endDate);
    await session.store(request);
    await session.saveChanges();
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
