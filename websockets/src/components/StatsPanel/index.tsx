import React from "react";

interface Props {
  users: number;
  onPrivateChat: (user: string) => void;
  totalNicknames: string[];
}

const StatsPanel: React.FC<Props> = ({ users, onPrivateChat, totalNicknames }) => {
  return (
    <div className="border p-2 rounded bg-white h-full">
      <h3 className="font-bold mb-2 text-amber-950">Usuarios en línea ({users})</h3>
      <ul>
        {totalNicknames.map((u) => (
          <li
            key={u}
            onClick={() => onPrivateChat(u)}
            className="cursor-pointer hover:text-blue-600 text-black"
          >
            {u}
          </li>
          
        ))}
      </ul>
    </div>
  );
};

export default StatsPanel;
