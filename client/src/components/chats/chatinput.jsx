import React, { useRef } from "react";
import { useAppContext } from "../../context/appContext";
import { useChatRoom } from "../../context/chatContext";
import { useSocket } from "../../context/socketContext";
import { formatDate } from "../utils/formatDate";
import { LuSendHorizontal } from "react-icons/lu";
import { v4 as uuidV4 } from "uuid";

function ChatInput() {
    const { currentUser } = useAppContext();
    const { socket } = useSocket();
    const { setMessages } = useChatRoom();
    const inputRef = useRef(null);

    const handleSendMessage = (e) => {
        e.preventDefault();

        const inputVal = inputRef.current?.value.trim();

        if (inputVal && inputVal.length > 0) {
            const message = {
                id: uuidV4(),
                message: inputVal,
                username: currentUser.username,
                timestamp: formatDate(new Date().toISOString()),
            };
            socket.emit("SEND_MESSAGE", { message });
            setMessages((messages) => [...messages, message]);

            if (inputRef.current) inputRef.current.value = "";
        }
    };

    return (
        <form
            onSubmit={handleSendMessage}
            className="flex justify-between rounded-md border border-primary"
        >
            <input
                type="text"
                className="w-full flex-grow rounded-md border-none bg-dark p-2 outline-none"
                placeholder="Enter a message..."
                ref={inputRef}
            />
            <button
                className="flex items-center justify-center rounded-r-md bg-primary p-2 text-black"
                type="submit"
            >
                <LuSendHorizontal size={24} />
            </button>
        </form>
    );
}

export default ChatInput;
