"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function togglePage(targetPage: string, manager_id: string)
{
    "use server";
    redirect(`/manager/${targetPage}?user_id=${manager_id}`);
}