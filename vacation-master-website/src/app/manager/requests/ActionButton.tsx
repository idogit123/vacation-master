"use client";

export default function ActionButton(
    {action, actionRequest}: {action: string, actionRequest: (action: string) => void}
) {
    return (
    <button data-action={action} onClick={() => actionRequest(action.toLowerCase())}>
        {action}
    </button>
    )
}