"use server";

import styles from './employee.module.css'
import VacationRequest from './VacationRequest';

export default async function EmployeePage(
    { searchParams: { user_id } }: { searchParams: { user_id: string } }
) {

    const response = await fetch(`http://localhost:8080/vacations/${user_id}`)
    const vacationRequests = await response.json() as {
        startDate: string
        endDate: string
        status: string
    }[]

    return <main>
        <h2 id={styles.title}>Vacation Requests</h2>
        <table id={styles.table}>
            <tr>
                <th>start</th>
                <th>end</th>
                <th>status</th>
            </tr>
            {vacationRequests.map((vacationRequest) => VacationRequest(vacationRequest))}
        </table>
    </main>
}