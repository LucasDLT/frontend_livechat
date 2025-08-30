import React, { useState } from "react";

interface Props {
  onSend: (content: string, to?: string) => void;
}

const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      console.log("🚀 Enviando mensaje:", message);
      
      setMessage("");
    }
  };

  return (
    <div className="flex p-2 border-t">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border rounded p-2"
        placeholder="Escribe un mensaje..."
      />
      <button onClick={handleSend} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
        Enviar
      </button>
    </div>
  );
};

export default MessageInput;
