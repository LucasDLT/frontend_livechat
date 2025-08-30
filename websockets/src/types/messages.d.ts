// ---------------- BASE ----------------
export interface BaseMessage {
  type: string;
  timestamp: number;
}

// ---------------- CLIENT -> SERVER ----------------
export interface SetNicknameMessage extends BaseMessage {
  type: "setNickname";
  payload: {
    nickname: string;
  };
}

export interface ChatMessageSend extends BaseMessage {
  type: "chat";
  payload: {
    text: string;
  };
}

export interface PrivateMessageSend extends BaseMessage {
  type: "private";
  payload: {
    to: string;
    text: string;
  };
}

export type ClientToServerMessage =
  | SetNicknameMessage
  | ChatMessageSend
  | PrivateMessageSend;

// ---------------- SERVER -> CLIENT ----------------
export interface SystemMessage extends BaseMessage {
  type: "system";
  payload: {
    text: string;
  };
}

export interface ChatMessageReceive extends BaseMessage {
  type: "chat";
  payload: {
    from: string;
    text: string;
  };
}

export interface PrivateMessageReceive extends BaseMessage {
  type: "private";
  payload: {
    from: string;
    to: string;
    text: string;
  };
}

export interface StatsMessage extends BaseMessage {
  type: "stats";
  payload: {
    users: string[];
    count: number;
  };
}

export type ServerToClientMessage =
  | SystemMessage
  | ChatMessageReceive
  | PrivateMessageReceive
  | StatsMessage;
