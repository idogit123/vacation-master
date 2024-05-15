import styles from '@/app/styles/form.module.css'

async function postNewRequest(formData: FormData, user_id: string) {
    "use server";
    
    const startDate = new Date(formData.get("startDate") as string | null ?? "")
    const endDate = new Date(formData.get("endDate") as string | null ?? "")

    const response = await fetch('http://localhost:8080/signup')
}

export default function NewRequestPage(
    { searchParams: { user_id } }: { searchParams: { user_id: string } }
) {
    return <main id={styles.page}>
        <div id={styles.container}>
            <h2 id={styles.title}>New Vacation Request</h2>
            <form action={(formData: FormData) => postNewRequest(formData, user_id)} id={styles.form}>
                <div id={styles.labelContainer}>
                    <label>
                        <p className={styles.p}>Start Date:</p>
                        <input className={styles.input} name="startDate" type="date" />
                    </label>
                    <label>
                        <p className={styles.p}>End Date:</p>
                        <input className={styles.input} name="endDate" type="date" />
                    </label>
                </div>
                <button id={styles.button}>Send Request</button>
            </form>
        </div>
    </main>
}