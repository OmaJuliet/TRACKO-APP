// 'use client'
// import React, { useEffect, useState } from "react";
// import { auth, db } from "../../firebase";
// import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
// import Image from 'next/image';

// export interface UserData {
//     shortBio: string;
//     jobRole: string;
//     uid: string;
//     name: string;
//     email: string;
//     avatar: string;
// }

// const roles = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Designer",
//     "Project Manager",
//     "DevOps",
//     "Software Tester",
// ];

// const Members = () => {
//     const [users, setUsers] = useState<UserData[]>([]);
//     const [authUser] = useAuthState(auth);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
//     const [selectedRole, setSelectedRole] = useState<string>("");
//     const [userRoles, setUserRoles] = useState<{ [key: string]: string }>({});

//     const handleEdit = (user: UserData) => {
//         setSelectedUser(user);
//         setShowEditModal(true);
//         // Set the selected role to the current user's role (if exists)
//         setSelectedRole(userRoles[user.uid] || "");
//     };

//     const handleCloseEditModal = () => {
//         setShowEditModal(false);
//         setSelectedUser(null);
//         setSelectedRole("");
//     };

//     const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedRole(event.target.value);
//     };

//     useEffect(() => {
//         const getSavedRole = () => {
//             const savedRole = localStorage.getItem("selectedRole");
//             return savedRole || "";
//         };

//         const fetchUsers = async () => {
//             try {
//                 const usersSnapshot = await getDocs(collection(db, "messages"));
//                 const newUsersData = usersSnapshot.docs.map(
//                     (doc) => doc.data() as UserData
//                 );

//                 const uniqueUsersData = Array.from(
//                     new Map(newUsersData.map((user) => [user.uid, user])).values()
//                 );

//                 const loggedInUser = uniqueUsersData.find(
//                     (user) => user?.uid === authUser?.uid
//                 );

//                 if (loggedInUser) {
//                     setUsers([loggedInUser, ...uniqueUsersData.filter((user) => user.uid !== authUser?.uid)]);
//                 } else {
//                     setUsers(uniqueUsersData);
//                 }
//             } catch (error) {
//                 console.error("Error fetching members:", error);
//             }
//         };

//         if (authUser) {
//             fetchUsers();
//             setSelectedRole(getSavedRole());
//         }
//     }, [authUser]);

//     const handleSaveRole = async () => {
//         if (selectedUser) {
//             try {
//                 // Update the user's role in Firestore
//                 const userRef = doc(db, "messages", selectedUser.uid);
//                 await updateDoc(userRef, { jobRole: selectedRole });

//                 // Update the local users data
//                 const updatedUsers = users.map((user) =>
//                     user.uid === selectedUser.uid
//                         ? { ...user, jobRole: selectedRole }
//                         : user
//                 );
//                 setUsers(updatedUsers);

//                 // Save the selected role to local storage
//                 localStorage.setItem("selectedRole", selectedRole);
//                 console.log("Saved role to local storage:", selectedRole);

//                 // Clear selectedUser and selectedRole
//                 setSelectedUser(null);
//                 setSelectedRole("");
//                 setShowEditModal(false);
//             } catch (error) {
//                 console.error("Error updating role:", error);
//             }
//         }
//     };


//     return (
//         <>
//             <section className="flex flex-col container px-2 mx-auto pl-36 pt-8">
//                 <section className="container px-2 mx-auto pl-32 pb-6">
//                     <h2 className="text-xl mb-4 text-gray-700 flex justify-center font-medium">
//                         Team Members
//                     </h2>
//                     <table className="table-auto w-full border-separate border-spacing-y-2">
//                         <thead className="mb-1">
//                             <tr className="text-gray-600">
//                                 <th className="py-3 px-6 font-medium text-left uppercase">
//                                     image
//                                 </th>
//                                 <th className="py-3 px-6 font-medium text-left uppercase">
//                                     name
//                                 </th>
//                                 <th className="py-3 px-6 font-medium text-left uppercase">
//                                     id
//                                 </th>
//                                 <th className="py-3 px-6 font-medium text-left uppercase">
//                                     role
//                                 </th>
//                                 <th className="py-3 px-6 font-medium text-left uppercase">
//                                     start date
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="">
//                             {users.map((user) => (
//                                 <tr
//                                     key={user.uid}
//                                     className="bg-gray-100 mb-4 border border-slate-600 rounded"
//                                 >
//                                     <td className="p-4 text-black">
//                                         <Image
//                                             src={user.avatar}
//                                             alt={`${user.name}'s avatar`}
//                                             width={24}
//                                             height={24}
//                                             className="text-indigo-500 w-12 h-12 rounded-full inline-block"
//                                         />
//                                     </td>
//                                     <td className="p-4 text-black">{user.name}</td>
//                                     <td className="p-4 text-black">{user.uid}</td>

//                                     <td className="p-4 text-black">
//                                         {authUser?.uid === user.uid ? (
//                                             <div className="relative">
//                                                 {selectedUser === user ? (
//                                                     <>
//                                                         <span>{selectedRole}</span>
//                                                         <button
//                                                             onClick={() => {
//                                                                 setSelectedUser(null);
//                                                                 setSelectedRole("");
//                                                             }}
//                                                             className="ml-2 text-blue-500"
//                                                         >
//                                                             ✏️
//                                                         </button>
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         {userRoles[user.uid] ? (
//                                                             <div className="flex items-center">
//                                                                 <span>{userRoles[user.uid]}</span>
//                                                                 <button
//                                                                     onClick={() => handleEdit(user)}
//                                                                     className="ml-2 text-blue-500"
//                                                                 >
//                                                                     ✏️
//                                                                 </button>
//                                                             </div>
//                                                         ) : (
//                                                             // Render the role selection dropdown when a role is not selected
//                                                             <button
//                                                                 onClick={() => handleEdit(user)}
//                                                                 className="px-2 py-1 text-blue-500 border rounded"
//                                                             >
//                                                                 Select role
//                                                             </button>
//                                                         )}
//                                                     </>
//                                                 )}
//                                                 {showEditModal && selectedUser?.uid === user.uid && (
//                                                     <div className="absolute top-8 left-0 w-48 py-2 bg-white border rounded shadow-md">
//                                                         <select
//                                                             onChange={(e) => setSelectedRole(e.target.value)}
//                                                             value={selectedRole}
//                                                             className="w-full px-2 py-1 border rounded"
//                                                         >
//                                                             <option value="">Select a role</option>
//                                                             {roles.map((role) => (
//                                                                 <option key={role} value={role}>
//                                                                     {role}
//                                                                 </option>
//                                                             ))}
//                                                         </select>
//                                                         {selectedRole && (
//                                                             <button
//                                                                 onClick={() => {
//                                                                     setUserRoles({
//                                                                         ...userRoles,
//                                                                         [user.uid]: selectedRole,
//                                                                     });
//                                                                     setSelectedUser(null);
//                                                                     setSelectedRole("");
//                                                                     setShowEditModal(false);
//                                                                 }}
//                                                                 className="block w-full px-2 py-1 mt-2 text-white bg-blue-500 border rounded hover:bg-blue-600"
//                                                             >
//                                                                 Save
//                                                             </button>
//                                                         )}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         ) : (
//                                             // Render the role column for other users (not the current user)
//                                             userRoles[user.uid] ? (
//                                                 <div className="flex items-center">
//                                                     <span>{userRoles[user.uid]}</span>
//                                                     <button
//                                                         onClick={() => handleEdit(user)}
//                                                         className="ml-2 text-blue-500"
//                                                     >
//                                                         ✏️
//                                                     </button>
//                                                 </div>
//                                             ) : (
//                                                 // Render the selected role (if exists) for other users
//                                                 user.jobRole
//                                             )
//                                         )}
//                                     </td>


//                                     <td className="p-4 text-black">{user.email}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </section>
//             </section>
//         </>
//     );
// };

// export default Members;

