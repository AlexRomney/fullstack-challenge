import { Outlet } from "react-router-dom";
import Navbar from "../components/Nav";

export default function MainLayout() {
    return (
        <div>
            <Navbar />
            <main className='p-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <Outlet /> 
            </main>
        </div>
    );
}