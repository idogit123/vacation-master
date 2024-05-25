
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

    getRole(): Employee | Manager
    {
        if (this.role == 'employee')
            return new Employee(this)

        return new Manager(this)
    }
}

export class Employee extends User {
    manager: string | null

    constructor(user: User) {
        super(user.name, user.password, user.role, user.id)
        this.manager = null;
    }
}

export class Manager extends User {

    constructor(user: User)
    {
        super(user.name, user.password, user.role, user.id)
    }
}