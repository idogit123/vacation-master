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
    id: string;

    constructor(name: string, password: string, role: Role, id: string) {
        this.name = name
        this.password = password
        this.role = role
        this.id = id
    }

    getRole(): Employee | Manager {
        if (this.role == "employee")
            return new Employee(this.name, this.password, this.id)

        return new Manager(this.name, this.password, this.id)
    }
}

export class Employee extends User {
    manager: string | null;

    constructor(name: string, password: string, id: string) {
        super(name, password, 'employee', id);

        this.manager = null;
    }
}

export class Manager extends User {
    employees: Employee[];

    constructor(name: string, password: string, id: string) {
        super(name, password, 'manager', id);

        this.employees = [];
    }
}