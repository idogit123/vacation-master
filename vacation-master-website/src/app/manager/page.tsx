"use server";

import { redirect } from "next/navigation";


export default async function ManagerPage()
{
    redirect('/manager/employees')
}