"use client";
import { useRouter } from "next/router";
import setRequestStatus from "./setRequestStatus";

export default function ActionButton(
    {action, requestId}: {action: string, requestId: string}
) {

    return <button data-action={action} onClick={async () => {
        console.log('action', action)
        await setRequestStatus(action, requestId)
    }}>
        {action}
    </button>
}