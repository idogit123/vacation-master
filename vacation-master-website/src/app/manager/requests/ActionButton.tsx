"use client";

export default function ActionButton(
    {action, setStatus}: {action: string, setStatus: (action: string) => void}
) {
    return (
    <button data-action={action} onClick={() => setStatus(action)}>
        {action}
    </button>
    )
}