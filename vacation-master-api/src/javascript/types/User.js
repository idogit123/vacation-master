export default class User {
    name;
    password;
    role;
    id;
    data;
    constructor(name, password, role, id = null) {
        this.name = name;
        this.password = password;
        this.role = role;
        this.id = id;
        this.data = null;
    }
    static fromObject(object) {
        const name = object.name;
        const password = object.password;
        const role = object.role;
        const id = object?.id;
        console.log(object);
        if (name == null || name.length == 0 || password == null || password.length == 0 || role == null) {
            throw TypeError('Name, password or role are invalid.');
        }
        return new User(name, password, role, id);
    }
    getRole() {
        if (this.role == "employee")
            return new Employee(this.name, this.password);
        return new Manager(this.name, this.password);
    }
    setId(id) {
        this.id = id;
    }
}
export class Employee extends User {
    manager;
    vacationRequest;
    constructor(name, password) {
        super(name, password, 'employee');
        this.manager = null;
        this.vacationRequest = [];
    }
}
export class Manager extends User {
    employees;
    pendingVacationRequests;
    constructor(name, password) {
        super(name, password, 'manager');
        this.employees = [];
        this.pendingVacationRequests = [];
    }
}