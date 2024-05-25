import styles from '../styles/form.module.css'
import { redirect } from 'next/navigation';
import SubmitFormButton from '../submitFormButton';

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
        redirect(`/login?error=${responseJson.error}`)
    }

    const {role, id} = responseJson.user
    if (role == 'manager')
    {
        redirect(`/manager/employees?user_id=${id}`)
    }
    else
        redirect(`/employee?user_id=${id}`)
}

export default function LoginPage(
    { searchParams: { error } }: { searchParams: { error: string | null } }
) {
    return <main id={styles.page}>
        <div id={styles.container}>
            <h2 id={styles.title}>Login</h2>
            <form action={submitLoginForm} id={styles.form}>
                <div id={styles.labelContainer}>
                    <label>
                        <p className={styles.p}>Name:</p>
                        <input className={styles.input} name="name" type="text" required />
                    </label>
                    <label>
                        <p className={styles.p}>Password:</p>
                        <input className={styles.input} name="password" type="password" required/>
                    </label>
                    <label>
                        { 
                            error ? <p className={styles.error}>
                                <span> Error:</span> {error}
                            </p> : "" 
                        }
                    </label>
                </div>
                <SubmitFormButton />
            </form>
        </div>
    </main>
}