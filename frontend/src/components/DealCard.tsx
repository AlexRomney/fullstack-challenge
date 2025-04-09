interface DealCardProps {
    account_name: string;
    value: number;
    status: "active" | "paused" | "cancelled";
    start_date: string;
    end_date: string;
}

export default function DealCard({
    account_name,
    value,
    status,
    start_date,
    end_date,
}: DealCardProps) {

    const formattedValue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);

    const formattedStartDate = new Date(start_date).toLocaleDateString();
    const formattedEndDate = new Date(end_date).toLocaleDateString();

    const badgeStyles = {
        active: "bg-green-50 text-green-700 ring-green-600/20",
        paused: "bg-gray-50 text-gray-600 ring-gray-500/10",
        cancelled: "bg-red-50 text-red-700 ring-red-600/20",
    };

    return (
        <li className="overflow-hidden rounded-xl border border-gray-200">
            <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <img
                    src="/sponsorcx.png"
                    alt={account_name}
                    className="size-16 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                />
                <div className="text-2xl font-medium text-gray-900">{account_name}</div>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm">
                <div className="flex justify-between gap-x-4 py-3">
                    <div>
                        <dt className="text-gray-700">Start Date</dt>
                        <dd className="text-gray-500">{formattedStartDate}</dd>
                    </div>
                    <div>
                        <dt className="text-gray-700">End Date</dt>
                        <dd className="text-gray-500">{formattedEndDate}</dd>
                    </div>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                    <dt className="text-gray-500">Amount</dt>
                    <dd className="flex items-start gap-x-2">
                        <div className="font-medium text-gray-900">{formattedValue}</div>
                        <div
                            className={`rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeStyles[status]}`}
                        >
                            {status}
                        </div>
                    </dd>
                </div>
            </dl>
        </li>
    );
}