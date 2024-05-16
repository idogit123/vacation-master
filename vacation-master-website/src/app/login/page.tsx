import styles from '../styles/form.module.css'
import User from '../types/User';
import { redirect } from 'next/navigation';

async function submitLoginForm(formData: FormData)
{
    "use server";
    const name = formData.get('name')
    const password = formData.get('password')
    const response = await fetch(
        `http://localhost:8080/login/${name}?password=${password}`,
        {
            "method": "GET",
        }
    )

    const responseJson = await response.json()
    if (responseJson.error)
    {
        console.log(responseJson.error)
        return
    }

    const user = User.fromObject(responseJson.data)
    redirect(`/${user.role}?user_id=${user.id}`)
}

export default function LoginPage() {
    return <main id={styles.page}>
        <div id={styles.container}>
            <h2 id={styles.title}>Login</h2>
            <form action={submitLoginForm} id={styles.form}>
                <div id={styles.labelContainer}>
                    <label>
                        <p className={styles.p}>Name:</p>
                        <input className={styles.input} name="name" type="text" />
                    </label>
                    <label>
                        <p className={styles.p}>Password:</p>
                        <input className={styles.input} name="password" type="password" />
                    </label>
                </div>
                <button id={styles.button}>Submit</button>
            </form>
        </div>
    </main>
}