export type RequestStatus = 'pending' | 'approved' | 'rejected'

export type VacationRequest = {
    employee_id: string;
    manager_id: string;
    employee_name: string;
    startDate: Date;
    endDate: Date;
    status: RequestStatus;
    id: string;
}