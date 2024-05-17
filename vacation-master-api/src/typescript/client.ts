import { DocumentStore, IAuthOptions, Lazy, ObjectTypeDescriptor } from "ravendb";
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

    await session.saveChanges()
    return existingUser
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
        return { data: logedUser }

    else 
        return { error: 'Password incorrect' }
}

export async function postRequest(startDate: Date, endDate: Date, user_id: string)
{
    const session = documentStore.openSession()

    const user = await session.load<Employee>(user_id)
    if (user == null || user.manager == null)
        return false
    const manager = await session.load<Manager>(user.manager)
    if (manager == null)
        return false

    const request = new VacationRequest(user_id, user.name, startDate, endDate)
    await session.store<VacationRequest>(request)

    manager.pendingVacationRequests.push(request.id)

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
    const session = await documentStore.openSession()
    const manager = await session.load<Manager>(manager_id)
    if (manager == null)
        return false

    let lazyRequests: Lazy<VacationRequest>[] = []
    manager.pendingVacationRequests.map((request_id) => {
        lazyRequests.push(
            session.advanced.lazily.load<VacationRequest>(request_id) as Lazy<VacationRequest>
        )
    })

    session.advanced.eagerly.executeAllPendingLazyOperations()

    const requests: VacationRequest[] = await lazyRequests.map(async (lazyRequest) => {
        return await lazyRequest.getValue()
    })

    session.saveChanges()
    return requests
}