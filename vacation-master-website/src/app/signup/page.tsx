import styles from '../styles/form.module.css'
import User from '../types/User';
import { redirect } from 'next/navigation';

async function submitSignupForm(formData: FormData)
{
    "use server";
    const response = await fetch(
        'http://localhost:8080/signup',
        {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                name: formData.get('name'),
                password: formData.get('password'),
                role: formData.get('role')
            })
        }
    )

    const { role, id } = (await response.json()).user
    if (role == 'manager')
    {
        redirect(`/manager/employees?user_id=${id}`)
    }
    else
        redirect(`/employee?user_id=${id}`)
}

export default function SignupPage() {

    return <main id={styles.page}>
        <div id={styles.container}>
            <h2 id={styles.title}>Signup</h2>
            <form action={submitSignupForm} id={styles.form}>
                <div id={styles.labelContainer}>
                    <label>
                        <p className={styles.p}>Name:</p>
                        <input className={styles.input} name="name" type="text" />
                    </label>
                    <label>
                        <p className={styles.p}>Password:</p>
                        <input className={styles.input} name="password" type="password" />
                    </label>
                    <label>
                        <p className={styles.p}>Role:</p>
                        <select name="role">
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                        </select>
                    </label>
                </div>
                <button id={styles.button}>Submit</button>
            </form>
        </div>
    </main>
}