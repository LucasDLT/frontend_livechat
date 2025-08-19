"use client";

import { useEffect, useState } from "react";

export default function WsTestPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const PORT = process.env.NEXT_PUBLIC_API_URL || "" ;
  useEffect(() => {
    // Crear conexión al servidor WS
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

    // Cerrar conexión cuando desmonta
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.send(input);
      setMessages((prev) => [...prev, `Yo: ${input}`]);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chat con WebSocket 🚀</h1>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "200px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "5px" }}
      />  
      <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "5px" }}>
        Enviar
      </button>
    </div>
  );
}
