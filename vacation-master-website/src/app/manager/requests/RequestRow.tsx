import VacationRequest from "@/app/types/Request";
import ActionButton from "./ActionButton";

export default function RequestRow({vacationRequest}: {vacationRequest: VacationRequest})
{
    const startDate = new Date(vacationRequest.startDate)
    const endDate = new Date(vacationRequest.endDate)
    const miliSecondsInDay = 1000 * 3600 * 24
    const durationInDays = (endDate.getTime() - startDate.getTime()) / miliSecondsInDay

    async function actionOnRequest(action: string) {
        "use server";
        
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
            <ActionButton action="Approve" actionRequest={actionOnRequest}/>
            <ActionButton action="Reject" actionRequest={actionOnRequest}/>
        </td>
    </tr>
}