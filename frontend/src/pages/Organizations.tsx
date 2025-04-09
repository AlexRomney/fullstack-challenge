import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Organization {
    id: number;
    name: string;
    created_at: string;
    deal_count?: number;
}

export default function Organization() {

    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/organizations") // normally stored in env
            .then((res) => {
                setOrganizations(res.data.orgs);
            })
            .catch((err) => {
                console.error("Failed to fetch organizations:", err);
            });
    }, []);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">All Organizations</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the organizations that use SponsorCX.
                    </p>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                        ID
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Joined Date
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Deal Count
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                { organizations.map((org) => (
                                    <tr key={org.id}
                                        onClick={() => navigate(`/organization/${org.id}`)}
                                        className="cursor-pointer hover:bg-gray-50 transition"
                                    >
                                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-500 sm:pl-0">
                                            { org.id }
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            { org.name }
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            { new Date(org.created_at).toLocaleDateString() }
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            { org.deal_count }
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/organizations/${org.id}`);
                                                }}
                                                className="inline-flex items-center rounded-md bg-gray-600 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
