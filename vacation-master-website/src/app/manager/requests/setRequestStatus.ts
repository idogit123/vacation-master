"use server";

import { revalidatePath } from "next/cache";

export default async function setRequestStatus(action: string, requestId: string) {
    const status = action == 'Approve' ? 'approved' : 'rejected'
    console.log('status', status)
    console.log('requestId', requestId)
    await fetch(
        `http://localhost:8080/status/${requestId.split('/')[1]}?status=${status}`,
        {
            method: 'PATCH'
        }
    )
    console.log('after fetch')
    revalidatePath('manager/requests')
}