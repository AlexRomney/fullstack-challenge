import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";

interface Deal {
    id: number;
    organization_name: string;
    account_name: string;
    value: number;
    start_date: string;
    end_date: string;
    status: string;
}

export default function Deals() {

    const [deals, setDeals] = useState<Deal[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/deals") // normally stored in env
            .then((res) => {
                setDeals(res.data.deals);
            })
            .catch((err) => {
                console.error("Failed to fetch deals:", err);
            });
    }, []);

    function getStatusBadgeClasses(status: string) {
        switch (status) {
            case "active":
                return "bg-green-50 text-green-700 ring-green-600/20";
            case "paused":
                return "bg-gray-50 text-gray-600 ring-gray-500/10";
            case "cancelled":
                return "bg-red-50 text-red-700 ring-red-600/20";
            default:
                return "bg-green-50 text-green-700 ring-green-600/20";
        }
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">All Deals</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the deals SponsorCX helps with.
                    </p>
                </div>
            </div>
            <Table headers={[
                "ID", "Organization Name", "Account Name", 
                "Value", "Start Date", "End Date", "Status"
            ]}>
                {deals.map((deal) => (
                    <tr key={deal.id}
                        onClick={() => navigate(`/deal/${deal.id}`)}
                        className="cursor-pointer hover:bg-gray-50 transition"
                    >
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-500 sm:pl-0">
                            {deal.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {deal.organization_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {deal.account_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: deal.value % 1 === 0 ? 0 : 2,
                                maximumFractionDigits: 2,
                            }).format(deal.value)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(deal.start_date).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(deal.end_date).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusBadgeClasses(deal.status)}`}>
                                {deal.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    )
}
