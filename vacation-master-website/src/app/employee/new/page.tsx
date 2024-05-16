import styles from '@/app/styles/form.module.css'

export default function NewRequestPage(
    { searchParams: { user_id } }: { searchParams: { user_id: string } }
) {

    async function postNewRequest(formData: FormData) {
        "use server";
    
        const response = await fetch(
            'http://localhost:8080/new',
            {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({
                    startDate: formData.get("startDate"),
                    endDate: formData.get('endDate'),
                    user_id: user_id
                })
            }
        )

        console.log(await response.json())
    }

    return <main id={styles.page}>
        <div id={styles.container}>
            <h2 id={styles.title}>New Vacation Request</h2>
            <form action={postNewRequest} id={styles.form}>
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