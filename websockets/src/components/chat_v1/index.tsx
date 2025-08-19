"use client";

import { useEffect, useState, useRef } from "react";

export default function WsTestPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const PORT = process.env.NEXT_PUBLIC_API_URL || "";
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ws = new WebSocket(PORT);

    ws.onopen = () => {
      console.log("✅ Conectado al servidor WebSocket");
      setMessages((prev) => [...prev, "Conectado al servidor ✅"]);
    };

    ws.onmessage = (event) => {
      console.log("📩 Mensaje recibido:", event.data);
      setMessages((prev) => [...prev, `Server: ${event.data}`]);
    };

    ws.onclose = () => {
      console.log("❌ Conexión cerrada");
      setMessages((prev) => [...prev, "Conexión cerrada ❌"]);
    };

    setSocket(ws);

    return () => ws.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.send(input);
      setMessages((prev) => [...prev, `Yo: ${input}`]);
      setInput("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        chucho's chat 
      </h1>

      <div className="border border-gray-300 rounded-md p-3 h-64 overflow-y-auto mb-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className="mb-1 text-gray-700">
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Escribe tu mensaje..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
