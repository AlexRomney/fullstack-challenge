export default function Home() {
    return (
        <div className="flex justify-center h-screen">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold">🎉 Welcome to the Fullstack Challenge! 🎉</h1>
                <p>Replace the content here with your own code and organize files as you see fit</p>
                <h2 className="text-xl font-semibold">Rules</h2>
                <ul className="list-disc list-inside text-left max-w-md mx-auto">
                    <li>Spend no more than 4 hours working on the challenge</li>
                    <li>Make use of any libraries and tools that you like</li>
                    <li>Feel free to use help from LLMs but be prepared to explain your code and the choices you made</li>
                    <li>Commit as you go. We want to see your thought process</li>
                </ul>
                <p>Good luck!</p>
            </div>
        </div>
    );
}