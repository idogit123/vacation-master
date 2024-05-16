import { Employee } from "./User";

type RequestStatus = 'pending' | 'approved' | 'rejected'

export default class VacationRequest {
    employee_id: string;
    startDate: string;
    endDate: string;
    status: RequestStatus;

    constructor(employee_id: string, startDate: string, endDate: string) {
        this.employee_id = employee_id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = 'pending';
    }
}