// src/context/context.jsx
import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // ✅ Start with a default chat
  useEffect(() => {
    if (chats.length === 0) {
      const firstChat = { id: Date.now(), title: "New Chat", messages: [] };
      setChats([firstChat]);
      setActiveChat(firstChat);
    }
  }, [chats]);

  // ✅ Start a brand-new chat
  const startNewChat = () => {
    const newChat = { id: Date.now(), title: "New Chat", messages: [] };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat);
  };

  // ✅ Update active chat with messages
  const updateActiveChat = (messages) => {
    setActiveChat((prev) => {
      if (!prev) return prev;
      const updatedChat = {
        ...prev,
        title: messages.find((m) => m.sender === "user")?.text || "New Chat",
        messages,
      };

      setChats((prevChats) =>
        prevChats.map((chat) => (chat.id === prev.id ? updatedChat : chat))
      );

      return updatedChat;
    });
  };

  const selectChat = (chat) => setActiveChat(chat);

  return (
    <ChatContext.Provider value={{ chats, activeChat, selectChat, startNewChat, updateActiveChat }}>
      {children}
    </ChatContext.Provider>
  );
};
