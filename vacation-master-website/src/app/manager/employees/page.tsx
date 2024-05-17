"use server";
import styles from '@/app/styles/list.module.css'
import { Employee } from '@/app/types/User';
import RecruitButton from './RecruitButton';

export default async function ManagerPage(
    {searchParams: {user_id}}: {searchParams: {user_id: string}}
) {
    const response = await fetch(`http://localhost:8080/employees/${user_id}`, {
        cache: 'no-cache'
    })

    const {newEmployees, managerEmployees} = await response.json() as {
        newEmployees: Employee[], managerEmployees: Employee[]
    }

    console.log('new:', newEmployees)
    console.log('old:', managerEmployees)

    return <main id={styles.listPage}>
        <div className={styles.listContainer}>
            <h2 id={styles.title}>New Employees</h2>
            <ul>
                {newEmployees.length == 0 && <p>No employees</p>}
                {
                    newEmployees.map(
                        (employee) => <li>
                            <div>
                                <p>{employee.name}</p>
                                <RecruitButton employeeId={employee.id} managerId={user_id}/>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
        <div className={styles.listContainer}>
            <h2 id={styles.title}>Your Employees</h2>
            <ul>
                {managerEmployees.length == 0 && <p>No employees</p>}
                {
                    managerEmployees.map((employee) => <li>{employee.name}</li>)
                }
            </ul>
        </div>
    </main>
}