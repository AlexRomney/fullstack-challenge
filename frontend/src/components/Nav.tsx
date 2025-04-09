import { Link, useLocation } from "react-router-dom";

export default function Navbar() {

    const location = useLocation();

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/organizations", label: "Organizations" },
        { to: "/accounts", label: "Accounts" },
        { to: "/deals", label: "Deals" },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Link to="/">
                                <img className="h-8 w-auto" src="/sponsorcx.png" alt="SponsorCX Logo" />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navLinks.map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${isActive(to)
                                        ? "border-indigo-500 text-gray-900"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    }`}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 pb-4 pt-2">
                    {navLinks.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`block border-b-2 py-2 pl-3 pr-4 text-base font-medium ${isActive(to)
                                ? "border-indigo-500 text-gray-900"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}