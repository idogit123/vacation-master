

export default function EmployeeLayout(
    { children }: Readonly<{ children: React.ReactNode }>
) {
    return <>
        <nav>
            <div className="">Employees</div>
            <div className="">Pending Requests</div>
        </nav>
        { children }
    </>
}