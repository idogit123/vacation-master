
export default function VacationRequest(
    { startDate: startString, endDate: endString, status }: {startDate: string, endDate: string, status: string}
) {

    const startDate = new Date(startString)
    const endDate = new Date(endString)
    const miliSecondsInDay = 1000 * 3600 * 24
    const durationInDays = (startDate.getTime() - endDate.getTime()) / miliSecondsInDay

    return <tr data-status={status}>
        <td datatype='start-date'>
            <p>{startDate.toDateString()}</p>
        </td>
        <td datatype='end-date'>
            <p>{endDate.toDateString()}</p>
        </td>
        <td datatype='status'>
            <p>{status}</p>
        </td>
    </tr>
}