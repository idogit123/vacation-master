import { DocumentStore } from "ravendb";
import { readFileSync } from 'fs';
import { User } from "./User.js";
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
    const usersCollection = user.role + 's';
    const queryForExistingUser = session.query({ collection: usersCollection })
        .whereEquals('name', user.name);
    const existingUser = await queryForExistingUser.firstOrNull();
    if (existingUser == null) {
        await session.store(user);
        await session.saveChanges();
        return user;
    }
    return existingUser;
}
