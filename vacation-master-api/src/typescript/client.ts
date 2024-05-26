import { DocumentStore, IAuthOptions } from "ravendb";
import { readFileSync } from 'fs'
import { User, Employee, Manager } from "./types/User.js";
import { RequestStatus, VacationRequest } from "./types/Request.js";


const authOptions: IAuthOptions = {
    certificate: readFileSync("./certificate/Client.pfx"),
    type: "pfx",
    password: "user123"
}

const documentStore = new DocumentStore("https://a.free.idodb.ravendb.cloud", "Vacation", authOptions);
documentStore.conventions.registerEntityType(User)
documentStore.initialize();
console.log("created a document store")

export async function storeUser(newUser: Manager | Employee) {
    const session = documentStore.openSession()

    const existingUser = await session.query<User>({collection: 'Users'})
        .whereEquals('name', newUser.name)
        .firstOrNull()

    if (existingUser == null) 
    {
        const id = newUser.name.replaceAll(' ', '-', ).toLowerCase()
        await session.store<User>(newUser, id, User)
        await session.saveChanges()
        return newUser
    }

    if (existingUser.password == newUser.password) {
        await session.saveChanges()
        return existingUser
    }
    
    return false
}

export async function getUser(user: {name: string, password: string})
{
    const session = documentStore.openSession()
    const logedUser = await session.query<User>({ collection: 'Users' })
        .whereEquals('name', user.name)
        .firstOrNull()
    await session.saveChanges()

    if (logedUser == null) 
        return { error: 'User not found' }

    else if (logedUser.password == user.password)
        return { user: logedUser }

    else 
        return { error: 'Password incorrect' }
}

export async function postRequest(startDate: Date, endDate: Date, user_id: string)
{
    const session = documentStore.openSession()

    const user = await session.load<Employee>(user_id)
    if (user == null || user.manager == null)
        return false

    const request: VacationRequest = new VacationRequest(
        user.manager,
        user_id, 
        user.name, 
        startDate, 
        endDate,
        'pending'
    )
    await session.store<VacationRequest>(request, undefined, {
        documentType: VacationRequest
    })
    await session.saveChanges()
    return true
}

export async function getVacations(user_id: string)
{
    const session = documentStore.openSession()

    const vacations = await session.query<VacationRequest>({ collection: 'VacationRequests' })
        .whereEquals('employee_id', user_id)
        .all()
    await session.saveChanges()

    return vacations
}

export async function getEmployees(manager_id: string)
{
    const session = documentStore.openSession()

    const newEmployees = await session.query<Employee>({ collection: 'Users' })
        .whereExists('manager')
        .whereEquals('manager', null)
        .lazily()
    
    const managerEmployees = await session.query<Employee>({ collection: 'Users' })
        .whereExists('manager')
        .whereEquals('manager', manager_id)
        .lazily()

    
    session.saveChanges()
    return {
        newEmployees: await newEmployees.getValue(),
        managerEmployees: await managerEmployees.getValue()
    }
}

export async function recruitEmployee(employee_id: string, manager_id: string)
{
    const session = documentStore.openSession()

    const employee = await session.load<Employee>(employee_id)
    if (employee == null)
        return false

    employee.manager = manager_id
    await session.saveChanges()

    return true
}

export async function getManagerRequests(manager_id: string)
{
    const session = documentStore.openSession()

    const requests = await session.query<VacationRequest>({collection: 'VacationRequests'})
        .whereEquals('manager_id', manager_id)
        .whereEquals('status', 'pending')
        .all()
    session.saveChanges()

    return requests
}

export async function setRequestStatus(request_id: string, status: RequestStatus)
{
    const session = documentStore.openSession()

    console.log(request_id)
    const request = await session.load<VacationRequest>(request_id)
    if (request == null)
    {
        console.log('request not found')
        return false
    }
        

    request.status = status
    console.log(request.status)
    await session.saveChanges()

    return true
}