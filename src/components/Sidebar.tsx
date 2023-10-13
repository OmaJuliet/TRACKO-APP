'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'

function Sidebar() {
    const pathname = usePathname();

    return (
        <header className="w-60 h-screen bg-white flex flex-col justify-between fixed top-0 shadow-md">

            {/* mt-24 */}
            <section className="flex flex-col mt-12 ml-6">
                <section className="border-b-2 border-gray-200">
                    <figure className="flex pb-5">
                        <img src="../Assets/Icons/logo.svg" className="text-purple-600" alt="logo" />
                        <p className="font-medium text-xl ml-2">TRACKO</p>
                    </figure>
                </section>

                <section className="mt-8 sxl:mt-4">
                    <Link href="/" >
                        <div
                            className={`flex flex-row cursor-pointer ${pathname === "/" ? "text-purple-600" : "text-gray-700"
                                }`}
                        >
                            <img src="../Assets/Icons/home.svg" className="" alt="" />
                            <span className="text-lg ml-3">Home</span>
                        </div>
                    </Link>
                </section>
                <section className="mt-8 sxl:mt-6">
                    <Link href="/messages">
                        <section
                            className={`flex flex-row cursor-pointer ${pathname === '/messages' ? 'text-purple-600' : 'text-gray-700'
                                }`}
                        >
                            <img src="../Assets/Icons/message.svg" className="" alt="" />
                            <span className="text-lg ml-3">Chat Room</span>
                        </section>
                    </Link>
                </section>
                <section className="mt-8 sxl:mt-6">
                    <Link href="/tasks">
                        <section
                            className={`flex flex-row cursor-pointer ${pathname === '/tasks' ? 'text-purple-600' : 'text-gray-700'
                                }`}
                        >
                            <img src="../Assets/Icons/tasks.svg" className="" alt="" />
                            <span className="text-lg ml-3">Tasks</span>
                        </section>
                    </Link>
                </section>
                <section className="mt-8 sxl:mt-6">
                    <Link href="/members">
                        <section
                            className={`flex flex-row cursor-pointer ${pathname === '/members' ? 'text-purple-600' : 'text-gray-700'
                                }`}
                        >
                            <img src="../Assets/Icons/members.svg" className="" alt="" />
                            <span className="text-lg ml-3">Members</span>
                        </section>
                    </Link>
                </section>
                <section className="mt-8 sxl:mt-6">
                    <Link href="/settings">
                        <section
                            className={`flex flex-row cursor-pointer ${pathname === '/settings' ? 'text-purple-600' : 'text-gray-700'
                                }`}
                        >
                            <img src="../Assets/Icons/settings.svg" className="" alt="" />
                            <span className="text-lg ml-3">Settings</span>
                        </section>
                    </Link>
                </section>
            </section>

            <section className="mx-3 mb-6 rounded-lg pt-1 pb-3 px-4 sxl:px-3 bg-gray-100 sxl:mt-6">
                <section>
                    <figure className="flex justify-center">
                        <img src="../Assets/Images/lightbulb.svg" className="w-16 h-16 sxl:w-12 sxl:h-12" alt="light bulb" />
                    </figure>
                    <section className="text-center mb-3 sxl:mb-1">
                        <h1 className="text-lg font-semibold mb-2">Thoughts Time</h1>
                        <p className="text-sm">We don’t have any notice for you, till then you can share your thoughts with your peers.</p>
                    </section>
                    <input type="text" className="bg-white outline-none p-2 rounded w-full" placeholder="Write a message" />
                </section>
            </section>
        </header>
    );
}

export default Sidebar;
