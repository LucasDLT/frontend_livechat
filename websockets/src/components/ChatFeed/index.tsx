import React from "react";
import { ServerToClientMessage,  } from "../../types/messages";

interface Props {
  messages: ServerToClientMessage[];
  selfNickname: string;
}

const ChatFeed: React.FC<Props> = ({ messages, selfNickname }) => {
  return (
    <div className="flex-1 overflow-y-auto p-2 bg-gray-50">
      {messages.map((msg, idx) => {
        switch (msg.type) {
          // Mensaje público
case "chat":
  return (
    <div
      key={idx}
      className={`p-1 ${msg.payload.from === selfNickname ? "text-blue-600" : "text-black"}`}
    >
      <b>{msg.payload.from || "Anonimo"}:</b> {msg.payload.text}
    </div>
  );


          // Mensaje privado recibido
          case "private":
  return (
    <div
      key={idx}
      className={`p-1 ${"from" in msg ? msg.payload.from === selfNickname ? "text-green-600" : "text-purple-600" : ""}`}
    >
      <b>{("from" in msg ? msg.payload.from : msg.payload.to) + (msg.type === "private" ? "" : " (privado)")}: </b> {msg.payload.text}
    </div>
  );

          // Mensajes de sistema, errores, o cambios de nickname
          case "system":
 
            return (
              <div key={idx} className="text-gray-500 italic p-1">
                {msg.payload?.text}
              </div>
            );



          default:
            return (
              <div key={idx} className="text-red-600 italic">
                Mensaje desconocido recibido
              </div>
            );
        }
      })}
    </div>
  );
};

export default ChatFeed;
