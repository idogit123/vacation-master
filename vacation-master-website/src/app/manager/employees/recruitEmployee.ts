"use server"

import { revalidatePath } from "next/cache"

export default async function recruitEmployee(employeeId: string, managerId: string)
{
    const response = await fetch(
        `http://localhost:8080/recruit/${employeeId}?manager_id=${managerId}`,
        {
            "method": "PUT",
        }
    )

    if (response.ok)
    {
        revalidatePath(`/manager?user_id=${managerId}`)
    }
}