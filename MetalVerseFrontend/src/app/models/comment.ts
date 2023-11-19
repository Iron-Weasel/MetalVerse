export interface Comment {
    id?: string;
    postId: string;
    userName: string;
    text: string;
    postedDate?: string;
    rockOns?: number;
}