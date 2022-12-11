export interface Forum {
    id: string;
    name: string;
    description: string;
    price: number;
    ownerId: string;
}

export interface Post {
    id: string;
    title: string;
    description: string;
    ownerId: string;
}

export interface Comment{
    id: string;
    text: string;
    likeCount: number;
    userId: string;
}