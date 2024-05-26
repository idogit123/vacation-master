import styles from '@/app/styles/form.module.css'
import SubmitFormButton from '@/app/submitFormButton';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default function NewRequestPage(
    { searchParams: { user_id, error } }: { searchParams: { user_id: string, error: string } }
) {
    async function postNewRequest(formData: FormData) {
        "use server";
        
        const startDate = new Date(formData.get("startDate") as string)
        const endDate = new Date(formData.get("endDate") as string)

        if (startDate.getTime() > endDate.getTime())
            redirect(`/employee/new?user_id=${user_id}&error=${'Start date must be before end date.'}`)

        const response = await fetch(
            'http://localhost:8080/new',
            {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify({
                    startDate: startDate,
                    endDate: endDate,
                    user_id: user_id
                })
            }
        )

        if ((await response.json()).success) {
            revalidatePath(`/employee?user_id=${user_id}`)
            redirect(`/employee?user_id=${user_id}`)
        }
        else 
            redirect(`/employee/new?user_id=${user_id}&error=${'You have no manager to send requests to.'}`)
    }

    return <main id={styles.page}>
        <div id={styles.container}>
            <h2 id={styles.title}>New Vacation Request</h2>
            <form action={postNewRequest} id={styles.form}>
                <div id={styles.labelContainer}>
                    <label>
                        <p className={styles.p}>Start Date:</p>
                        <input className={styles.input} name="startDate" type="date" required />
                    </label>
                    <label>
                        <p className={styles.p}>End Date:</p>
                        <input className={styles.input} name="endDate" type="date" required />
                    </label>
                    <label>
                        { 
                            error ? <p className={styles.error}>
                                <span>Error:</span> {error}
                            </p> : "" 
                        }
                    </label>
                </div>
                <SubmitFormButton />
            </form>
        </div>
    </main>
}