import { Employee } from "./User";

type RequestStatus = 'pending' | 'approved' | 'rejected'

export default class VacationRequest {
    employee_id: string;
    employee_name: string;
    startDate: string;
    endDate: string;
    status: RequestStatus;
    id: string;

    constructor(employee_id: string, employee_name: string, startDate: string, endDate: string, id: string) {
        this.employee_id = employee_id;
        this.employee_name = employee_name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = 'pending';
        this.id = id;
    }
}