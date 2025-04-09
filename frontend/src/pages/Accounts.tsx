import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";

interface Account {
    id: number;
    name: string;
    created_at: string;
    deal_count?: number;
}

export default function Accounts() {

    const [accounts, setAccounts] = useState<Account[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/accounts") // normally stored in env
            .then((res) => {
                setAccounts(res.data.accounts);
            })
            .catch((err) => {
                console.error("Failed to fetch accounts:", err);
            });
    }, []);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">All Accounts</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the accounts that use SponsorCX.
                    </p>
                </div>
            </div>
            <Table headers={["ID", "Name", "Joined Date", "Deal Count"]}>
                {accounts.map((account) => (
                    <tr key={account.id}
                        onClick={() => navigate(`/accounts/${account.id}`)}
                        className="cursor-pointer hover:bg-gray-50 transition"
                    >
                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-500 sm:pl-0">
                            {account.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {account.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(account.created_at).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {account.deal_count}
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    )
}
