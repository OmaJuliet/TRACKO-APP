'use client'
import React, { Key, useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setAppName } from './redux/appSlice';
// import { RootState } from './redux/store';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Image from 'next/image';

export interface UserData {
  id: Key | null | undefined;
  shortBio: string;
  jobRole: string;
  uid: string;
  name: string;
  email: string;
  avatar: string;
}


const Heading = () => {
  // const [isEditing, setIsEditing] = useState(false);
  // const dispatch = useDispatch();
  const [users, setUsers] = useState<UserData[]>([]);
  const [authUser] = useAuthState(auth);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "messages"));
        const newUsersData = usersSnapshot.docs.map(
          (doc) => doc.data() as UserData
        );

        const uniqueUsersData = Array.from(
          new Map(newUsersData.map((user) => [user.uid, user])).values()
        );

        const loggedInUser = uniqueUsersData.find(
          (user) => user?.uid === authUser?.uid
        );

        if (loggedInUser) {
          setUsers([loggedInUser, ...uniqueUsersData.filter((user) => user.uid !== authUser?.uid)]);
        } else {
          setUsers(uniqueUsersData);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    if (authUser) {
      fetchUsers();
    }
  }, [authUser]);



  // const appName = useSelector((state: RootState) => state.app.appName);
  // const handleEditIconClick = () => {
  //   setIsEditing(true);
  // };

  // const handleAppNameChange = (e: { target: { value: string; }; }) => {
  //   dispatch(setAppName(e.target.value));
  //   localStorage.setItem('appName', e.target.value);
  // };

  // const handleInputBlur = () => {
  //   setIsEditing(false);
  // };

  // useEffect(() => {
  //   const storedAppName = localStorage.getItem('appName');
  //   if (storedAppName) {
  //     dispatch(setAppName(storedAppName));
  //   }
  // }, [dispatch]);


  return (
    <>
      <section className="container pt-8 mx-auto pl-24 pr-8">
        <section className="flex flex-row justify-between">
          <section className="flex">
            <h1 className="text-3xl font-medium">Tracko App</h1>
            <Image
              src="../Assets/Icons/pen.svg"
              className="w-7 h-7 mt-2 ml-4 cursor-pointer"
              width={24}
              height={24}
              alt="pen"
            />
            <Image
              src="../Assets/Icons/outline.svg"
              className="w-7 h-7 mt-2 ml-2 p-1 rounded bg-purple-100 cursor-pointer"
              width={24}
              height={24}
              alt="outline"
            />
          </section>

          <section>
            <section className="flex">
              <Image
                src="../Assets/Icons/plus.svg"
                className="w-8 h-8 rounded-full cursor-pointer"
                width={24}
                height={24}
                alt="plus icon"
              />
              <p className="font-medium text-base text-purple-600 ml-2 mr-3 mt-2 cursor-pointer">Invite</p>

              {users.map((user) => (
                <Image
                  key={user.id}
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  title={user.name}
                  width={24}
                  height={24}
                  className="w-8 h-8 rounded-full mr-1"
                />
              ))}

              <div className="ml-1 p-1 text-red-500">+2</div>
            </section>
          </section>
        </section>
      </section>
    </>
  )
}

export default Heading