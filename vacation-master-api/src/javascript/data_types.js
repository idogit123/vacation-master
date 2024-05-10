export var RequestStatus;
(function (RequestStatus) {
    RequestStatus[RequestStatus["pending"] = 0] = "pending";
    RequestStatus[RequestStatus["approved"] = 1] = "approved";
    RequestStatus[RequestStatus["rejected"] = 2] = "rejected";
})(RequestStatus || (RequestStatus = {}));
export class User {
    name;
    password;
    role;
    constructor(name, password, role) {
        this.name = name;
        this.password = password;
        this.role = role;
    }
    static typeDescriptor() {
        return {
            name: "User",
            construct: "User",
            isType(entity) {
                return entity && entity.name && entity.password && entity.role;
            }
        };
    }
    static fromJson(json) {
        const name = json.name;
        const password = json.password;
        const role = json.role;
        if (name == null || name.length == 0 || password == null || password.length == 0 || role == null)
            throw TypeError('Name, password or role are invalid.');
        return new User(name, password, role);
    }
    getRole() {
        if (this.role == "employee")
            return new Employee(this.name, this.password);
        return new Manager(this.name, this.password);
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
export class VacationRequest {
    employee;
    startDate;
    endDate;
    status;
    constructor(employee, startDate, endDate) {
        this.employee = employee;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = RequestStatus.pending;
    }
}
