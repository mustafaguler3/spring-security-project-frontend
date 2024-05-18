import { Comment } from "./comment";

export class Post {
    id!: number;
    name!:string;
    caption!:string
    postedDate!: Date
    username!: string
    location!:string;
    likes!:string
    comments!:Comment[]
}
