import VacationRequest from "@/app/types/Request";

function convertIdToName(id: string): string {
    const words = id.split('-')
    words.forEach((word, index) => {
        words[index] = word.charAt(0).toUpperCase() + word.slice(1)
    })
    return words.join(' ')
}

export default function RequestRow({vacationRequest}: {vacationRequest: VacationRequest})
{
    return <tr>
        <td>{convertIdToName(vacationRequest.employee_id)}</td>
        <td>{vacationRequest.startDate}</td>
        <td>{vacationRequest.endDate}</td>
        <td><button>Approve</button></td>
    </tr>
}