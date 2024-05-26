"use client";
import { useTransition } from "react";
import setRequestStatus from "./setRequestStatus";
import styles from '@/app/styles/button.module.css'

export default function ActionButton(
    {action, requestId}: {action: string, requestId: string}
) {
    const [isPending, startTransition] = useTransition()

    return <button data-action={action} onClick={
        () => {
            startTransition(
                () => setRequestStatus(action, requestId)
            )
        }
    }>
        {
            isPending ? <div id={styles.loaderContainer} >
                <div id={styles.loader} ></div>
            </div> : action
        }
    </button>
}