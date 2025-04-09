interface TableProps {
    headers: string[];
    children: React.ReactNode;
}

export default function Table({ headers, children }: TableProps) {
    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    <th
                                        key={ index }
                                        scope="col"
                                        className={`${index === 0
                                                ? "py-3.5 pl-4 pr-3 sm:pl-0"
                                                : "px-3 py-3.5"
                                            } text-left text-sm font-semibold text-gray-900`}
                                    >
                                        { header }
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            { children }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}