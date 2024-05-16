"use server";

import { redirect } from "next/navigation";


export default async function goToNewVacationPage(user_id: string) {
    
    console.log('test')
    redirect(`/employee/new?user_id=${user_id}`)
}