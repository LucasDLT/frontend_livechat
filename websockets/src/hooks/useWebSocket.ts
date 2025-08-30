'use client';
import { useEffect, useRef, useState } from "react";
import { ClientToServerMessage, ServerToClientMessage } from "../types/messages";

export function useWebSocket(url: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<ServerToClientMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setIsConnected(true);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as ServerToClientMessage;
      setMessages((prev) => [...prev, data]);
    };

    ws.onclose = () => setIsConnected(false);

    return () => {
      ws.close();
    };
  }, [url]);

  function sendMessage(msg: ClientToServerMessage) {
    wsRef.current?.send(JSON.stringify(msg));
  }

  return { isConnected, messages, sendMessage };
}
