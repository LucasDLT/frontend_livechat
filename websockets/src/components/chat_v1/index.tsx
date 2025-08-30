"use client";
import React, { useEffect, useState, useRef } from "react";
import { ChatMessageSend, ClientToServerMessage, PrivateMessageSend, ServerToClientMessage } from "@/types/messages";
import ChatFeed from "@/components/ChatFeed";
import MessageInput from "@/components/MessageInput";
import NicknameBar from "@/components/NicknameBar";
import StatsPanel from "@/components/StatsPanel";

const WS_URL = process.env.NEXT_PUBLIC_API_URL; // tu backend ya deployado
console.log(WS_URL);

if (!WS_URL) {
  throw new Error("NEXT_PUBLIC_API_URL no está definida");
}
const App: React.FC = () => {
  const [messages, setMessages] = useState<ServerToClientMessage[]>([]);
  const [users, setUsers] = useState<number>(0);
  const [nickname, setNickname] = useState("Anonimo");
  const [nicks, setNicks] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;
    console.log("🚀 WS URL:", WS_URL);
    console.log("wsRef.current:", wsRef.current);

    ws.onopen = () => console.log("✅ Connected");
    ws.onclose = () => console.log("❌ Disconnected");
    ws.onerror = (err) => console.error("⚠️ WS Error:", err);

    ws.onmessage = (event) => {
      const msg: ServerToClientMessage = JSON.parse(event.data);

      switch (msg.type) {
        case "chat":
        case "private":
        case "system":
          console.log("Recibiendo mensaje:", msg); // para depurar
          setMessages((prev) => [...prev, msg]);
          break;
        case "stats":
          setUsers(msg.payload.count);
          setNicks(msg.payload.users);
          console.log("🚀 Stats nicks:", msg.payload.users);
          break;
      }
    };

    return () => ws.close();
  }, []);

  const sendMessage = (msg: ClientToServerMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

const handleSendChat = (content: string, to?: string) => {
  const timestamp = Date.now();

  if (to) {
    const msg: PrivateMessageSend = {
      type: "private",
      timestamp,
      payload: {
        to,
        text:content, // debe llamarse "content"
      },
    };
    sendMessage(msg);
    setMessages(prev => [...prev, { ...msg, payload: { ...msg.payload, from: nickname } }]); // agrego localmente con from
  } else {
    const msg: ChatMessageSend = {
      type: "chat",
      timestamp,
      payload: {
        text:content, // debe llamarse "content"
      },
    };
    sendMessage(msg);
    setMessages(prev => [...prev, { ...msg, payload: { ...msg.payload, from: nickname } }]); // agrego localmente con from
  }
};


  const handleSetNickname = (newName: string) => {
    setNickname(newName);
    sendMessage({
      type: "setNickname",
      timestamp: Date.now(),
      payload: { nickname: newName },
    });
  };

  return (
    <div className="flex h-screen">
      {/* Panel izquierdo */}
      <div className="flex flex-col w-3/4 border-r">
        <NicknameBar nickname={nickname} onChange={handleSetNickname} />
        <ChatFeed messages={messages} selfNickname={nickname} />
        <MessageInput onSend={handleSendChat} />
      </div>

      {/* Panel derecho */}
      <div className="w-1/4 p-2">
        <StatsPanel
          totalNicknames={nicks}
          users={users}
          onPrivateChat={(u) => console.log("Privado con", u)}
        />
      </div>
    </div>
  );
};

export default App;
