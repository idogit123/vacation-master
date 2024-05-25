import styles from '@/app/styles/form.module.css'

export default function LoadingNewRequestPage()
{
    return <main id={styles.page}>
        <div id={styles.container}>
            <h2 id={styles.title}>New Vacation Request</h2>
            <form id={styles.form}>
                Loading...
            </form>
        </div>
    </main>
}