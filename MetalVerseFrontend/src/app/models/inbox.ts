import { Message } from "./message";

export interface Inbox {
    userId: string;
    messages: Message[];
}