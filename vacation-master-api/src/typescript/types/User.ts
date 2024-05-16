import VacationRequest from "./Request"

type Role = 'employee' | 'manager'


export class User  {
    name: string
    password: string
    role: Role
    id: string

    constructor(name: string, password: string, role: Role, id: string)
    {
        this.name = name
        this.password = password
        this.role = role
        this.id = id
    }

    getRole()
    {
        if (this.role == 'employee')
            return new Employee(this)

        return new Manager(this)
    }
}

export class Employee extends User {
    manager: string | null
    vacationRequests: string[]

    constructor(user: User) {
        super(user.name, user.password, user.role, user.id)
        this.manager = null;
        this.vacationRequests = []
    }
}

export class Manager extends User {
    employees: string[]
    pendingVacationRequests: string[]

    constructor(user: User)
    {
        super(user.name, user.password, user.role, user.id)
        this.employees = []
        this.pendingVacationRequests = []
    }
}