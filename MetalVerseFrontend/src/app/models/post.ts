import { Comment } from "./comment";

export interface Post {
    id?: string;
    userId: string;
    title: string;
    description: string;
    imageURL: string;
    createdDate?: string;
    views?: number;
    rockOns?: number;
    comments: Comment[];
}