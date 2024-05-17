"use client"

import recruitEmployee from "./recruitEmployee"

export default function RecruitButton({ employeeId, managerId }:{employeeId: string, managerId: string})
{
    return <button onClick={() => recruitEmployee(employeeId, managerId)}>Recruit</button>
}