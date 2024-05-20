import styles from '@/app/styles/list.module.css'

export default function LoadingEmployeesPage()
{
    return <main id={styles.listPage}>
        <div className={styles.listContainer}>
            <h2 id={styles.title}>New Employees</h2>
            <ul>
                <p>Loading new employees</p>
            </ul>
        </div>
        <div className={styles.listContainer}>
            <h2 id={styles.title}>Your Employees</h2>
            <ul>
                <p>Loading your employees</p>
            </ul>
        </div>
    </main>
}