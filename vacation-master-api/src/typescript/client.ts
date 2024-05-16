import { DocumentStore, IAuthOptions, ObjectTypeDescriptor } from "ravendb";
import { readFileSync } from 'fs'
import { User, Employee, Manager } from "./types/User.js";
import VacationRequest from "./types/Request.js";

const authOptions: IAuthOptions = {
    certificate: readFileSync("./certificate/Client.pfx"),
    type: "pfx",
    password: "user123"
}

const documentStore = new DocumentStore("https://a.free.idodb.ravendb.cloud", "Vacation", authOptions);
documentStore.conventions.registerEntityType(User)
documentStore.initialize();
console.log("created a document store")

export async function storeUser(user: Manager | Employee) {
    const session = documentStore.openSession()

    const queryForExistingUser = session.query<User>({collection: 'Users'})
        .whereEquals('name', user.name)

    const existingUser = await queryForExistingUser.firstOrNull()

    if (existingUser == null) 
    {
        const id = user.name.replaceAll(' ', '-', ).toLowerCase()
        await session.store<User>(user, id, User)
        await session.saveChanges()
        return user
    }

    return existingUser
}

export async function getUser(user: {name: string, password: string})
{
    const session = documentStore.openSession()
    const logedUser = await session.query<User>({ collection: 'Users' })
        .whereEquals('name', user.name)
        .firstOrNull()

    if (logedUser == null) 
        return { error: 'User not found' }

    else if (logedUser.password == user.password)
        return { data: logedUser }

    else 
        return { error: 'Password incorrect' }
}

export async function postRequest(startDate: Date, endDate: Date, user_id: string)
{
    const session = documentStore.openSession()
    const employee = await session.load<Employee>(user_id)
    if (employee == null) 
        return null

    const request = new VacationRequest(user_id, startDate, endDate)
    await session.store<VacationRequest>(request)
    employee.vacationRequests.push(request.id)

    await session.saveChanges()

    return employee.vacationRequests
}