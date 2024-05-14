"use server";

export default async function EmployeePage(
    { searchParams: { user_id } }: { searchParams: { user_id: string } }
) {
    const response = fetch(`http://localhost:8080/user/${user_id}`)

    return <main>
        <h1>Past Requests</h1>
        <p>user: {user_id}</p>
    </main>
}