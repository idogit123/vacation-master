import { DocumentStore, IAuthOptions, ObjectTypeDescriptor } from "ravendb";
import { readFileSync } from 'fs'
import { User } from "./User.js";

const authOptions: IAuthOptions = {
    certificate: readFileSync("./certificate/Client.pfx"),
    type: "pfx",
    password: "user123"
}

const documentStore = new DocumentStore("https://a.free.idodb.ravendb.cloud", "Vacation", authOptions);

documentStore.conventions.registerEntityType(User)
documentStore.initialize();

console.log("created a document store")

export async function storeUser(user: User): Promise<User> {
    const session = documentStore.openSession()

    const usersCollection = user.role + 's'
    const queryForExistingUser = session.query<User>({collection: usersCollection})
        .whereEquals('name', user.name)

    const existingUser = await queryForExistingUser.firstOrNull()

    if (existingUser == null) 
    {
        await session.store<User>(user)
        await session.saveChanges()
        return user
    }

    return existingUser
}