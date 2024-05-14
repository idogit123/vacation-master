import { DocumentStore } from "ravendb";
import { readFileSync } from 'fs';
import User from "./types/User.js";
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
    const queryForExistingUser = session.query({ collection: 'users' })
        .whereEquals('name', user.name);
    const existingUser = await queryForExistingUser.firstOrNull();
    if (existingUser == null) {
        const id = user.name.replace(' ', '-').toLowerCase();
        await session.store(user, id);
        await session.saveChanges();
        return user;
    }
    return existingUser;
}
export async function getUser(user_id) {
    const session = documentStore.openSession();
    const user = await session
        .include('data')
        .load(user_id);
    const manager = await session.load(user?.manager);
    return user;
}
