import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DealCard from "../components/DealCard";

interface Deal {
    id: number;
    value: number;
    status: "active" | "paused" | "cancelled";
    account_name: string;
    start_date: string;
    end_date: string;
}

interface OrganizationDetail {
    org_id: number;
    org_name: string;
    org_created: string;
    deals: Deal[];
    totals: {
        active: number;
        paused: number;
        cancelled: number;
    };
}

export default function OrganizationDetails() {
    
    const { id } = useParams<{ id: string }>();
    const [org, setOrg] = useState<OrganizationDetail>();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/organizations/${id}`)
            .then((res) => {
                setOrg(res.data);
                setError(null);
            })
            .catch((err) => {
                setError(err.response.data.error);
            });
    }, [id]);

    if (error) {
        return (
            <div className="p-6 sm:flex sm:items-center sm:justify-between">
                <div className="rounded w-1/4 bg-red-100 p-4 text-sm text-red-700">
                    {error}
                </div>
                <div className="mt-4 sm:mt-0">
                    <button
                        onClick={() => navigate("/organizations")}
                        className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200"
                    >
                        ← Back
                    </button>
                </div>
            </div>
        );
    }

    if (!org) {
        return <p>Loading...</p>;
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">{org.org_name}</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        All deals for {org.org_name}
                    </p>
                </div>

                <div className="mt-4 sm:mt-0">
                    <button
                        onClick={() => navigate("/organizations")}
                        className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200"
                    >
                        ← Back
                    </button>
                </div>
            </div>

            {org.deals.length === 0 && (
                <div className="mt-6 rounded-md bg-yellow-50 p-4 text-sm text-yellow-800 ring-1 ring-yellow-600/20">
                    This organization doesn't have any deals yet.
                </div>
            )}

            <div className="mt-4 rounded-md bg-gray-50 p-4 ring-1 ring-gray-600/20">
                <p> Total Values </p>
                <div className="flex space-x-12 mt-2">
                    {Object.entries(org.totals).map(([status, value]) => (
                        <div key={status} className="text-sm">
                            <p className="capitalize text-gray-500">{status}</p>
                            <p className="font-semibold text-gray-900">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
                                }).format(value)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <ul
                    role="list"
                    className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
                >
                    {org.deals.map((deal) => (
                        <DealCard
                            key={deal.id}
                            account_name={deal.account_name}
                            value={deal.value}
                            status={deal.status}
                            start_date={deal.start_date}
                            end_date={deal.end_date}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}