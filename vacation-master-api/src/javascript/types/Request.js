export default class VacationRequest {
    employee;
    startDate;
    endDate;
    status;
    constructor(employee, startDate, endDate) {
        this.employee = employee;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = 'pending';
    }
}
