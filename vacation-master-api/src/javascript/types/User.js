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
    constructor(user) {
        super(user.name, user.password, user.role, user.id);
        this.manager = null;
    }
}
export class Manager extends User {
    employees;
    constructor(user) {
        super(user.name, user.password, user.role, user.id);
        this.employees = [];
    }
}
