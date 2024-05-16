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
    return existingUser;
}
export async function getUser(user) {
    const session = documentStore.openSession();
    const logedUser = await session.query({ collection: 'Users' })
        .whereEquals('name', user.name)
        .firstOrNull();
    if (logedUser == null)
        return { error: 'User not found' };
    else if (logedUser.password == user.password)
        return { data: logedUser };
    else
        return { error: 'Password incorrect' };
}
export async function postRequest(startDate, endDate, user_id) {
    const session = documentStore.openSession();
    const employee = await session.load(user_id);
    if (employee == null)
        return null;
    const request = new VacationRequest(user_id, startDate, endDate);
    await session.store(request);
    employee.vacationRequests.push(request.id);
    await session.saveChanges();
    return employee.vacationRequests;
}
