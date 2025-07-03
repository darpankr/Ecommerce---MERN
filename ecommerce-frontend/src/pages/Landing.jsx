import Link from "next/link";

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full">
            <body className="h-full">
                <div className="flex flex-col h-screen">
                    {/* Navbar - stays constant */}
                    <nav className="my-10">
                        <ul className="flex justify-center items-center gap-4 text-lg">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/products">Products</Link></li>
                            <li><Link href="/about">About</Link></li>
                        </ul>
                    </nav>

                    {/* Dynamic content - changes on route */}
                    <main className="flex-1 bg-amber-200 flex justify-center items-start">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
