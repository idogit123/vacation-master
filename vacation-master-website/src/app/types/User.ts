import VacationRequest from "./Request"

type Role = 'employee' | 'manager'
type UserObject = {
    name: string
    password: string
    role: Role
    id: string
}

export default class User {
    name: string;
    password: string;
    role: Role;
    id: null | string;

    constructor(name: string, password: string, role: Role, id: null | string = null) {
        this.name = name
        this.password = password
        this.role = role
        this.id = id
    }

    static fromObject(object: UserObject) {
        const name = object.name
        const password = object.password
        const role: Role = object.role
        const id = object?.id

        console.log(object)
        if (name == null || name.length == 0 || password == null || password.length == 0 || role == null)
            throw TypeError('Name, password or role are invalid.')

        return new User(name, password, role, id)
    }

    getRole(): Employee | Manager {
        if (this.role == "employee")
            return new Employee(this.name, this.password, this.id)

        return new Manager(this.name, this.password, this.id)
    }
}

export class Employee extends User {
    manager: string | null;
    vacationRequest: VacationRequest[];

    constructor(name: string, password: string, id: string | null) {
        super(name, password, 'employee', id);

        this.manager = null;
        this.vacationRequest = [];
    }
}

export class Manager extends User {
    employees: Employee[];
    pendingVacationRequests: VacationRequest[];

    constructor(name: string, password: string, id: string | null) {
        super(name, password, 'manager', id);

        this.employees = [];
        this.pendingVacationRequests = [];
    }
}