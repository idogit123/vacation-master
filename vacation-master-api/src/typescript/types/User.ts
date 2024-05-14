import VacationRequest from "./Request"

type Role = 'employee' | 'manager'
type EmployeeData = {
    manager: string
    vacationRequests: VacationRequest[]
}
type ManagerData = {
    employees: string[]
    pendingRequests: VacationRequest[]
}


export default class User {
    name: string;
    password: string;
    role: Role;
    id: null | string;
    data: string | null;

    constructor(name: string, password: string, role: Role, id: null | string = null) {
        this.name = name
        this.password = password
        this.role = role
        this.id = id
        this.data = null
    }

    static fromObject(object: UserObject) {
        const name = object.name
        const password = object.password
        const role: Role = object.role
        const id = object?.id

        console.log(object)
        if (name == null || name.length == 0 || password == null || password.length == 0 || role == null)
        {
            throw TypeError('Name, password or role are invalid.')
        }    
            

        return new User(name, password, role, id)
    }

    getRole(): Employee | Manager {
        if (this.role == "employee")
            return new Employee(this.name, this.password)

        return new Manager(this.name, this.password)
    }

    setId(id: string) {
        this.id = id
    }
}

export class Employee extends User {
    manager: string | null;
    vacationRequest: VacationRequest[];

    constructor(name: string, password: string) {
        super(name, password, 'employee');

        this.manager = null;
        this.vacationRequest = [];
    }
}

export class Manager extends User {
    employees: Employee[];
    pendingVacationRequests: VacationRequest[];

    constructor(name: string, password: string) {
        super(name, password, 'manager');

        this.employees = [];
        this.pendingVacationRequests = [];
    }
}