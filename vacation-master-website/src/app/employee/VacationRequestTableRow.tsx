import VacationRequest from '@/app/types/Request'


export default function VacationRequestTableRow(
    { vacationRequest }: {vacationRequest: VacationRequest}
) {

    const startDate = new Date(vacationRequest.startDate)
    const endDate = new Date(vacationRequest.endDate)
    const miliSecondsInDay = 1000 * 3600 * 24
    const durationInDays = (endDate.getTime() - startDate.getTime()) / miliSecondsInDay

    return <tr>
        <td datatype='start-date'>
            <p>{startDate.toDateString()}</p>
        </td>
        <td datatype='end-date'>
            <p>{endDate.toDateString()}</p>
        </td>
        <td datatype='duration'>
            <p>{durationInDays} Days</p>
        </td>
        <td datatype='status' data-status={vacationRequest.status}>
            <p>{vacationRequest.status}</p>
        </td>
    </tr>
}