import React, { useState } from "react";

interface Props {
  nickname: string;
  onChange: (newName: string) => void;
}

const NicknameBar: React.FC<Props> = ({ nickname, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(nickname);

  const save = () => {
    setEditing(false);
    if (value.trim()) onChange(value.trim());
  };

  return (
    <div className="p-2 border-b bg-gray-100 flex items-center">
      {editing ? (
        <>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border rounded p-1 flex-1 text-black"
          />
          <button onClick={save} className="ml-2 px-2 py-1 bg-green-500 text-white rounded">
            OK
          </button>
        </>
      ) : (
        <div className="flex-1">
          <span className="font-bold text-black">{nickname}</span>
          <button
            onClick={() => setEditing(true)}
            className="ml-2 text-sm text-black underline"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default NicknameBar;
