import styles from '@/app/styles/table.module.css'

export default function LoadingEmployeePage()
{
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
                <tr>
                    <td>
                        <p>Loading employee's requests...</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
}