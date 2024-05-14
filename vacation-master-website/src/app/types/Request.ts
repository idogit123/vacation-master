import { Employee } from "./User";

type RequestStatus = 'pending' | 'approved' | 'rejected'

export default class VacationRequest {
    employee: Employee;
    startDate: Date;
    endDate: Date;
    status: RequestStatus;

    constructor(employee: Employee, startDate: Date, endDate: Date) {
        this.employee = employee;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = 'pending';
    }
}