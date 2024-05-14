import { DocumentStore, IAuthOptions, ObjectTypeDescriptor } from "ravendb";
import { readFileSync } from 'fs'
import User from "./types/User.js";

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

    const queryForExistingUser = session.query<User>({collection: 'users'})
        .whereEquals('name', user.name)

    const existingUser = await queryForExistingUser.firstOrNull()

    if (existingUser == null) 
    {
        const id = user.name.replace(' ', '-').toLowerCase()
        await session.store<User>(user, id)
        await session.saveChanges()
        return user
    }

    return existingUser
}

export async function getUser(user_id: string): Promise<User | null> {
    const session = documentStore.openSession()

    const user = await session
        .include('data')
        .load<User>(user_id)

    const manager = await session.load(user?.manager)
    
    return user
}