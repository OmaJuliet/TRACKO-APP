'use client';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Link from 'next/link';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

function Header() {
    const [user] = useAuthState(auth);
    const [userAvatar, setUserAvatar] = useState('');
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCalendarDropdownOpen, setIsCalendarDropdownOpen] = useState(false);
    const [isSetEventModalOpen, setIsSetEventModalOpen] = useState(false);
    const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
    const [events, setEvents] = useState<{ date: Date | null; name: string; completed: boolean; }[]>([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [eventName, setEventName] = useState<string>('');

    const router = useRouter();

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const signOut = () => {
        auth.signOut();
        router.push('/');
    };

    useEffect(() => {
        if (user) {
            setUserAvatar(user.photoURL || '');
        } else {
            setUserAvatar('');
        }
    }, [user]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const openCalendarDropdown = () => {
        setIsCalendarDropdownOpen(!isCalendarDropdownOpen);
    };

    const closeCalendarDropdown = () => {
        setIsCalendarDropdownOpen(false);
    };

    const openUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const closeUserDropdown = () => {
        setIsUserDropdownOpen(false);
    };

    const openSetEventModal = () => {
        setIsSetEventModalOpen(true);
    };

    const closeSetEventModal = () => {
        setIsSetEventModalOpen(false);
        setSelectedDate(null);
        setEventName('');
    };

    const openViewEventModal = () => {
        setIsViewEventModalOpen(true);
    };

    const closeViewEventModal = () => {
        setIsViewEventModalOpen(false);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleSetEventSubmit = () => {
        const newEvent = {
            date: selectedDate,
            name: eventName,
            completed: false,
        };
        setEvents([...events, newEvent]);
        closeSetEventModal();
        toast.success(`An event has been added`, {
            position: "top-right",
            autoClose: false,
        });
    };

    const handleEventComplete = (index: number) => {
        const updatedEvents = [...events];
        updatedEvents[index].completed = !updatedEvents[index].completed;
        setEvents(updatedEvents);
    };

    const handleDeleteEvent = (index: number) => {
        const updatedEvents = [...events];
        updatedEvents.splice(index, 1);
        setEvents(updatedEvents);
        toast.error(`An event has been deleted`, {
            position: "top-right",
            autoClose: false,
        });
    };

    return (
        <>
            <section className="lg:flex hidden flex lg:justify-between items-center p-6 w-full lg:pl-24 pl-1 overflow-hidden bg-white top-0 z-50 border-b-2">
                <section className="ml-44">
                    <input type="text" className="bg-gray-100 p-2 rounded outline-none" placeholder="Search for anything" />
                </section>

                <section className="mr-2 flex justify-between">
                    <figure className="flex flex-row items-center mr-12 relative">
                        <div className="relative inline-block">
                            <Image
                                src="../Assets/Icons/calendar.svg"
                                className="cursor-pointer"
                                width={24}
                                height={24}
                                alt="calendar icon"
                                onClick={openCalendarDropdown}
                            />
                            {isCalendarDropdownOpen && (
                                <section className="absolute z-50 right-8 mt-[-2.7rem] w-32 bg-white border border-gray-300 rounded-md shadow-lg">
                                    <ul className="py-2">
                                        <li className="px-4 pb-2 hover:bg-gray-100 text-sm cursor-pointer" onClick={() => { openSetEventModal(); setIsCalendarDropdownOpen(false); }}>Set Event</li>
                                        <li className="px-4 py-1 hover:bg-gray-100 text-sm cursor-pointer" onClick={() => { openViewEventModal(); setIsCalendarDropdownOpen(false); }}>View Events</li>
                                    </ul>
                                </section>
                            )}
                        </div>
                        <Link href="/messages">
                            <Image
                                src="../Assets/Icons/mess-que.svg"
                                className="ml-6 cursor-pointer"
                                width={24}
                                height={24}
                                alt="message icon"
                            />
                        </Link>
                        <Link href="/notifications">
                            <Image
                                src="../Assets/Icons/bell.svg"
                                className="ml-6 cursor-pointer"
                                width={24}
                                height={24}
                                alt="notification icon"
                            />
                        </Link>
                    </figure>

                    <section className="flex">
                        <section className="flex flex-col mt-1">
                            <h2 className="text-sm font-medium">{user ? user.displayName : 'Name'}</h2>
                            <p className="text-sm">Remote</p>
                        </section>

                        <section className="relative inline-block">
                            <figure className="ml-4 rounded-full">
                                {userAvatar ? (
                                    <Image
                                        src={userAvatar}
                                        className="rounded-full w-12 h-12"
                                        width={24}
                                        height={24}
                                        alt="user"
                                    />
                                ) : (
                                    <Image
                                        src="../Assets/Icons/user.svg"
                                        className="rounded-full w-12 h-12"
                                        width={24}
                                        height={24}
                                        alt="user icon"
                                    />
                                )}
                            </figure>
                        </section>

                        <section className="mt-3 ml-1">
                            <Image
                                src="../Assets/Icons/dropdown.svg"
                                className="cursor-pointer"
                                width={16}
                                height={16}
                                alt="dropdown icon"
                                onClick={toggleUserDropdown}
                            />
                            {isUserDropdownOpen && (
                                <section className="absolute z-50 right-8 top-16 w-32 bg-white border border-gray-300 rounded-md shadow-lg">
                                    <ul className="py-4">
                                        <Link href="/settings">
                                            <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                                        </Link>
                                        {user ? (
                                            <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer" onClick={signOut}>Sign Out</li>
                                        ) : (
                                            <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer" onClick={googleSignIn}>Sign In</li>
                                        )}
                                    </ul>
                                </section>
                            )}
                        </section>
                    </section>
                </section>
            </section>


            {/* mobile navigation */}
            <section className="bg-white top-0 z-50 border-b-2 lg:hidden block px-4 py-3 sticky w-full msm:px-12 mmm:px-16">
                <section className="flex flex-row justify-between pt-1">
                    <figure className="flex pb-4">
                        <Image
                            src="../Assets/Icons/logo.svg"
                            className=""
                            width={24}
                            height={24}
                            alt="app logo"
                        />
                        <p className="font-medium msm:text-xl mmm:text-xl text-lg ml-1">TRACKO</p>
                    </figure>
                    {/* <section className="">
                        <input type="text" className="bg-gray-100 p-2 rounded outline-none" placeholder="Search for anything" />
                    </section> */}
                </section>

                <section className="mr-2 flex mt-4 mss:justify-between msm:justify-between mmm:justify-between">
                    <figure className="flex flex-row items-center mr-12 relative">
                        <div className="relative inline-block">
                            <Image
                                src="../Assets/Icons/calendar.svg"
                                className="cursor-pointer"
                                width={24}
                                height={24}
                                alt="calendar icon"
                                onClick={openCalendarDropdown}
                            />
                            {isCalendarDropdownOpen && (
                                <section className="absolute z-50 left-1 mt-3 w-32 bg-white border border-gray-300 rounded-md shadow-lg">
                                    <ul className="py-2">
                                        <li className="px-4 pb-2 hover:bg-gray-100 text-sm cursor-pointer" onClick={() => { openSetEventModal(); setIsCalendarDropdownOpen(false); }}>Set Event</li>
                                        <li className="px-4 py-1 hover:bg-gray-100 text-sm cursor-pointer" onClick={() => { openViewEventModal(); setIsCalendarDropdownOpen(false); }}>View Events</li>
                                    </ul>
                                </section>
                            )}
                        </div>
                        <Link href="/messages">
                            <Image
                                src="../Assets/Icons/mess-que.svg"
                                className="ml-4 cursor-pointer"
                                width={24}
                                height={24}
                                alt="message icon"
                            />
                        </Link>
                        <Link href="/notifications">
                            <Image
                                src="../Assets/Icons/bell.svg"
                                className="ml-4 cursor-pointer"
                                width={24}
                                height={24}
                                alt="notification icon"
                            />
                        </Link>
                    </figure>

                    <section className="flex">
                        <section className="flex flex-col mt-1">
                            <h2 className="text-sm font-medium">{user ? user.displayName : 'Name'}</h2>
                            <p className="text-sm">Remote</p>
                        </section>

                        <section className="relative inline-block">
                            <figure className="ml-4 rounded-full">
                                {userAvatar ? (
                                    <Image
                                        src={userAvatar}
                                        className="rounded-full w-12 h-12"
                                        width={24}
                                        height={24}
                                        alt="user"
                                    />
                                ) : (
                                    <Image
                                        src="../Assets/Icons/user.svg"
                                        className="rounded-full w-12 h-12"
                                        width={24}
                                        height={24}
                                        alt="user icon"
                                    />
                                )}
                            </figure>
                        </section>

                        <section className="mt-3 ml-1">
                            <Image
                                src="../Assets/Icons/dropdown.svg"
                                className="cursor-pointer"
                                width={16}
                                height={16}
                                alt="dropdown icon"
                                onClick={toggleUserDropdown}
                            />
                            {isUserDropdownOpen && (
                                <section className="absolute z-50 right-8 top-32 w-32 bg-white border border-gray-300 rounded-md shadow-lg">
                                    <ul className="py-4">
                                        <Link href="/settings">
                                            <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                                        </Link>
                                        {user ? (
                                            <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer" onClick={signOut}>Sign Out</li>
                                        ) : (
                                            <li className="px-6 py-2 hover:bg-gray-100 cursor-pointer" onClick={googleSignIn}>Sign In</li>
                                        )}
                                    </ul>
                                </section>
                            )}
                        </section>
                    </section>
                </section>
            </section>

            {/* Set Events Modal */}
            <Modal
                isOpen={isSetEventModalOpen}
                onRequestClose={closeSetEventModal}
                contentLabel="Set Events Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    content: {
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        maxWidth: '700px',
                        width: '100%',
                        height: '50%',
                        padding: '20px',
                        position: 'relative',
                    },
                }}
            >
                <section className="msm:flex msm:flex-col">
                    <h2 className="text-lg font-medium mb-3">Set Event</h2>
                    <input
                        type="text"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        placeholder="Enter event name"
                        className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500"
                    />

                    <DatePicker
                        selected={selectedDate}
                        onChange={(date: Date | null) => setSelectedDate(date)}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select a date and time"
                        showTimeInput
                        timeInputLabel="Time:"
                        className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500 mt-6"
                    />
                </section>


                <section className="mt-6">
                    <button onClick={handleSetEventSubmit} className="w-full lg:w-auto lg:mt-0 mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">Submit</button>
                    <button onClick={closeSetEventModal} className="w-full lg:w-auto lg:mt-0 mt-4 px-4 py-2 text-gray-700 border border-purple-500 text-purple-500 rounded lg:ml-4">Close</button>
                </section>
            </Modal>


            {/* View Events Modal */}
            <Modal
                isOpen={isViewEventModalOpen}
                onRequestClose={closeViewEventModal}
                contentLabel="View Events Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    content: {
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        maxWidth: '700px',
                        width: '100%',
                        padding: '20px',
                        position: 'relative',
                    },
                }}
            >
                <h2 className="text-xl font-medium mb-4">Upcoming Events</h2>
                <ul>
                    {events.length === 0 ? (
                        <li className="text-red-500">No events yet</li>
                    ) : (
                        events.map((event, index) => (
                            <li key={index} className="flex flex-row justify-between items-center mt-3 bg-gray-100 px-3 py-2 rounded">
                                <section className="flex flex-row items-center">
                                    <input type="checkbox" checked={event.completed} onChange={() => handleEventComplete(index)} className="mr-2" />
                                    <p className={`ml-2 text-lg ${event.completed ? 'line-through' : ''}`}>
                                        {event.date ? new Date(event.date).toLocaleString() : 'Invalid Date'} - {event.name}
                                    </p>
                                </section>
                                <FaTrash className="ml-2 text-red-600 cursor-pointer" onClick={() => handleDeleteEvent(index)} />
                            </li>
                        ))
                    )}
                </ul>
                <button onClick={closeViewEventModal} className="mt-10 bg-purple-400 hover:bg-white hover:border hover:border-purple-400 hover:text-purple-400 text-white px-4 py-2 rounded">Close</button>
            </Modal>
            <ToastContainer position="top-right" />
        </>
    );
}

export default Header;
