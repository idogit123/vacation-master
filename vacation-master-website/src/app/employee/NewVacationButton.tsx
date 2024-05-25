"use client";

import styles from '@/app/styles/button.module.css'
import goToNewVacationPage from './navigateToNewVacation';
import { useTransition } from 'react';

export default function NewVacationButton({ user_id }: {user_id: string})
{
    const [isPending, startTransition] = useTransition()
    return <button 
        id={styles.newVacationsButton} 
        className={styles.button}
        onClick={
            () => startTransition(
                ()  => goToNewVacationPage(user_id)
            )
        }
        disabled={isPending}
    >
        {isPending ? <div id={styles.loader}></div> : "+"}
    </button>
}