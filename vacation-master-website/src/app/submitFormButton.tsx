"use client";

import styles from '@/app/styles/button.module.css'
import { useFormStatus } from 'react-dom';

export default function SubmitFormButton()
{
    const { pending: isPending } = useFormStatus()

    return <button className={styles.button} disabled={isPending}>
        {isPending ? <div id={styles.loader}></div> : "Submit"}
    </button>
}
