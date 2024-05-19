export class VacationRequest {
    employee_id;
    manager_id;
    employee_name;
    startDate;
    endDate;
    status;
    id;
    constructor(manager_id, employee_id, employee_name, startDate, endDate, status) {
        this.manager_id = manager_id;
        this.employee_id = employee_id;
        this.employee_name = employee_name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.id = '';
    }
}
