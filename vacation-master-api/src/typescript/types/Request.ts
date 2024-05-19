export type RequestStatus = 'pending' | 'approved' | 'rejected'

export class VacationRequest {
    employee_id: string;
    manager_id: string;
    employee_name: string;
    startDate: Date;
    endDate: Date;
    status: RequestStatus;
    id: string;

    constructor(
        manager_id: string, 
        employee_id: string, 
        employee_name: string, 
        startDate: Date, 
        endDate: Date,
        status: RequestStatus
    ) {
        this.manager_id = manager_id;
        this.employee_id = employee_id;
        this.employee_name = employee_name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.id = ''
    }
}