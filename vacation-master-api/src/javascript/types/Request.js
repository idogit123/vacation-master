export default class VacationRequest {
    employee_id;
    employee_name;
    startDate;
    endDate;
    status;
    id;
    constructor(employee_id, employee_name, startDate, endDate) {
        this.employee_id = employee_id;
        this.employee_name = employee_name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = 'pending';
        this.id = "";
    }
}
