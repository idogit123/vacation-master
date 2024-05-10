import { DocumentStore, IAuthOptions, ObjectTypeDescriptor } from "ravendb";
import { readFileSync } from 'fs'
import { User } from "./data_types.js";

const authOptions: IAuthOptions = {
    certificate: readFileSync("./certificate/Client.pfx"),
    type: "pfx",
    password: "user123"
}

const documentStore = new DocumentStore("https://a.free.idodb.ravendb.cloud", "Vacation", authOptions);

documentStore.conventions.registerEntityType(User)
documentStore.initialize();

console.log("created a document store")

export async function storeUser(user: User) {
    const session = documentStore.openSession()
    await session.store<User>(user)
    await session.saveChanges()
}