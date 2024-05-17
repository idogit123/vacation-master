"use client"

import styles from '@/app/styles/nav.module.css'
import togglePage from './togglePage';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ManagerLayout(
    { children }: Readonly<{ children: React.ReactNode }>
) {
    const searchParams = useSearchParams()
    let [currentPage, setCurrentPage] = useState('employees')

    function isTogglePage(targetPage: string) {
        if (targetPage != currentPage)
        {   
            setCurrentPage(targetPage)
            togglePage(targetPage, searchParams.get('user_id') as string)
        }
    }

    return <>
        <nav id={styles.nav} data-selected={currentPage}>
            <div data-status={currentPage == 'employees'} onClick={
                async () => isTogglePage('employees')
            }>
                Employees
            </div>
            <div data-status={currentPage == 'requests'} onClick={
                async () => isTogglePage('requests')
            }>
                Pending Requests
            </div>
        </nav>
        { children }
    </>
}