export class User {
    name;
    password;
    role;
    id;
    constructor(name, password, role, id) {
        this.name = name;
        this.password = password;
        this.role = role;
        this.id = id;
    }
    getRole() {
        if (this.role == 'employee')
            return new Employee(this);
        return new Manager(this);
    }
}
export class Employee extends User {
    manager;
    vacationRequests;
    constructor(user) {
        super(user.name, user.password, user.role, user.id);
        this.manager = null;
        this.vacationRequests = [];
    }
}
export class Manager extends User {
    employees;
    pendingVacationRequests;
    constructor(user) {
        super(user.name, user.password, user.role, user.id);
        this.employees = [];
        this.pendingVacationRequests = [];
    }
}
