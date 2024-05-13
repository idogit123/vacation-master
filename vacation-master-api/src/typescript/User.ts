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

    constructor(name: string, password: string, role: Role) {
        this.name = name
        this.password = password
        this.role = role
        this.id = null
    }

    static fromObject(object: UserObject) {
        const name = object.name
        const password = object.password
        const role: Role = object.role

        if (name == null || name.length == 0 || password == null || password.length == 0 || role == null)
            throw TypeError('Name, password or role are invalid.')

        return new User(name, password, role)
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