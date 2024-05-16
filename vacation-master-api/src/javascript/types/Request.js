export default class VacationRequest {
    employee_id;
    startDate;
    endDate;
    status;
    id;
    constructor(employee_id, startDate, endDate) {
        this.employee_id = employee_id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = 'pending';
        this.id = "";
    }
}
