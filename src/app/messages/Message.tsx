import React from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from 'next/image';

interface MessageProps {
    message: {
        uid: string;
        avatar: string;
        name: string;
        text: string;
        createdAt: {
            toMillis: () => number;
        };
    };
}

const Message = ({ message }: MessageProps) => {
    const [user] = useAuthState(auth);

    if (!user) {
        return null;
    }

    const isCurrentUser = message.uid === user.uid;
    const messageClass = isCurrentUser ? "message current-user" : "message other-user";


    return (
        <section className={messageClass}>
            <section className="message-content">
                <section className="message-details">
                    <Image 
                        src={message.avatar}
                        width={28}
                        height={28}
                        className="avatar"
                        alt={message.name}
                    />
                    <div className="message-text">
                        <p className="name">{message.name}</p>
                        <p className="text">{message.text}</p>
                        <p className="timestamp">
                            {message.createdAt && new Date(message.createdAt.toMillis()).toLocaleString()}
                        </p>
                    </div>
                </section>
            </section>
        </section>
    );
};

export default Message;
