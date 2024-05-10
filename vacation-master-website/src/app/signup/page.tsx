import styles from './style.module.css'

async function submitSignupForm(formData: FormData)
{
    "use server";
    console.log(formData)
}

export default function SignupPage() {

    return <main id={styles.page}>
        <div id={styles.container}>
            <h2 id={styles.title}>Signup page</h2>
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
                            <option value="employee">Manager</option>
                        </select>
                    </label>
                </div>
                <button id={styles.button}>Submit</button>
            </form>
        </div>
    </main>
}