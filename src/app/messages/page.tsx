'use client'
import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "../../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface MessageData {
  id: string;
  text: string;
  name: string;
  avatar: string;
  createdAt: {
    toMillis: () => number;
  };
  uid: string; 
}


const ChatBox = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const scroll = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe: Unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: MessageData[] = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id } as MessageData);
      });
      
      const sortedMessages = fetchedMessages.sort((a, b) => {
        const aMillis = a.createdAt ? a.createdAt.toMillis() : 0; 
        const bMillis = b.createdAt ? b.createdAt.toMillis() : 0; 
        return aMillis - bMillis;
      });
      
      
      setMessages(sortedMessages);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Sidebar />
      <Header />
      <main className="container mx-auto flex justify-center lg:pl-60">
          <section className="flex flex-col h-screen w-full"> {/* h-fit */}
            <div className="flex-grow lg:p-4 p-2">
              {messages?.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
            <span ref={scroll}></span>
            <SendMessage scroll={scroll} />
          </section>
      </main>
    </>
  );
};

export default ChatBox;