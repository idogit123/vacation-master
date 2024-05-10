export type Role = 'employee' | 'manager'

export enum RequestStatus {
    'pending',
    'approved',
    'rejected'
}

interface UserData {
    name: string
    password: string
    role: Role
}

export class User {
    name: string;
    password: string;
    role: Role;

    constructor(name: string, password: string, role: Role) {
        this.name = name;
        this.password = password;
        this.role = role;
    }

    static typeDescriptor() {
        return {
            name: "User",
            construct: "User",
            isType(entity: any) {
                return entity && entity.name && entity.password && entity.role
            }
        }
    }

    static fromJson(json: UserData) {
        const name = json.name
        const password = json.password
        const role: Role = json.role

        if (name == null || name.length == 0 || password == null || password.length == 0 || role == null)
            throw TypeError('Name, password or role are invalid.')

        return new User(name, password, role)
    }

    getRole(): Employee | Manager {
        if (this.role == "employee")
            return new Employee(this.name, this.password)

        return new Manager(this.name, this.password)
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

export class VacationRequest {
    employee: Employee;
    startDate: Date;
    endDate: Date;
    status: RequestStatus;

    constructor(employee: Employee, startDate: Date, endDate: Date) {
        this.employee = employee;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = RequestStatus.pending;
    }
}