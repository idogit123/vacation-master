"use server";

import styles from '@/app/styles/table.module.css'
import VacationRequestTableRow from './VacationRequestTableRow';
import NewVacationButton from './NewVacationButton';
import VacationRequest from '@/app/types/Request';

export default async function EmployeePage(
    { searchParams: { user_id } }: { searchParams: { user_id: string } }
) {

    const response = await fetch(`http://localhost:8080/vacations/${user_id}`, {
        cache: 'no-cache'
    })
    const vacationRequests = await response.json() as VacationRequest[]

    return <main>
        <h2 id={styles.title}>Vacation Requests</h2>
        <table id={styles.table}>
            <tbody>
                <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Duration</th>
                    <th>Status</th>
                </tr>
                {
                vacationRequests.length == 0 && <tr>
                    <td>
                        <p>No requests</p>
                    </td>
                </tr>
                }
                {vacationRequests.map(
                    (vacationRequest: VacationRequest, index: number) => {
                        return <VacationRequestTableRow vacationRequest={vacationRequest} key={index}/>
                    }
                )}
            </tbody>
        </table>
        <NewVacationButton user_id={user_id}/>
    </main>
}