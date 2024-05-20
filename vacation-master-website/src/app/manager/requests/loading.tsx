import styles from '@/app/styles/table.module.css'

export default function LoadingRequestsPage()
{
    return <main id={styles.page}>
        <h2 id={styles.title}>Vacation Requests</h2>
        <table id={styles.table}>
            <tbody>
                <tr>
                    <th>Employee</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Duration</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>
                        <p>Loading requests...</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
}