"use client";

import styles from '@/app/styles/table.module.css'
import goToNewVacationPage from './navigateToNewVacation';

export default function NewVacationButton({ user_id }: {user_id: string})
{
    return <button id={styles.newVacationsButton} onClick={() => goToNewVacationPage(user_id)}>+</button>
}