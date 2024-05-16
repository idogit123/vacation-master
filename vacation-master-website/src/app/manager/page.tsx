"use server";
import styles from '@/app/styles/table.module.css'
import { Employee } from '@/app/types/User';

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

    return <main>
        <h2 id={styles.title}>New Employees</h2>
        <ul>
            {newEmployees.length == 0 && <p>No employees</p>}
            {
                newEmployees.map((employee) => <li>{employee.name}</li>)
            }
        </ul>
        <h2 id={styles.title}>Your Employees</h2>
        <ul>
            {managerEmployees.length == 0 && <p>No employees</p>}
            {
                managerEmployees.map((employee) => <li>{employee.name}</li>)
            }
        </ul>
    </main>
}