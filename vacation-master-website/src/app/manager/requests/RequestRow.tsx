import VacationRequest from "@/app/types/Request";
import ActionButton from "./ActionButton";

export default function RequestRow({vacationRequest}: {vacationRequest: VacationRequest})
{
    const startDate = new Date(vacationRequest.startDate)
    const endDate = new Date(vacationRequest.endDate)
    const miliSecondsInDay = 1000 * 3600 * 24
    const durationInDays = (endDate.getTime() - startDate.getTime()) / miliSecondsInDay

    async function setRequestStatus(action: string) {
        "use server";
        const status = action == 'Approve' ? 'approved' : 'rejected'
        await fetch(`http://localhost:8080/status/${vacationRequest.id}?status=${status}`,
        {
            "method": "PATCH",
        })
    }

    return <tr>
        <td datatype="employee-name">
            <p>{vacationRequest.employee_name}</p>
        </td>
        <td datatype="start-date">
            <p>{startDate.toDateString()}</p>
        </td>
        <td datatype="end-date">
            <p>{endDate.toDateString()}</p>
        </td>
        <td datatype="duration">
            <p>{durationInDays}</p>
        </td>
        <td datatype="action">
            <ActionButton action="Approve" setStatus={setRequestStatus}/>
            <ActionButton action="Reject" setStatus={setRequestStatus}/>
        </td>
    </tr>
}