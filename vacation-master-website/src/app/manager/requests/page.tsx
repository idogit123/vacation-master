import styles from '@/app/styles/table.module.css'
import VacationRequest from '@/app/types/Request'
import RequestRow from './RequestRow'

export default async function RequestsPage(
    {searchParams: {user_id}}: {searchParams: {user_id: string}}
) {
    const response = await fetch(`http://localhost:8080/requests/${user_id}`, {
        cache: 'no-cache'
    })

    const requests: VacationRequest[] = await response.json()
    console.log(requests)

    return <main id={styles.page}>
        <h2 id={styles.title}>Vacation Requests</h2>
        <table id={styles.table}>
            <tbody>
                <tr>
                    <th>Employee</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Action</th>
                </tr>
                {
                    requests.map(request => <RequestRow vacationRequest={request}/>)
                }
            </tbody>
        </table>
    </main>
}