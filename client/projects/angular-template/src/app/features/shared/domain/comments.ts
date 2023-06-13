import {User} from "@shared/domain/user";
import {Author} from "@shared/domain/article";


export interface SingleCommentResponse {
	comment: Comment;
}

export interface MultipleCommentsResponse {
	comments: Comment[];
}

export interface NewComment {
	id: number;
	articleId : number;
	authorId : string;
	content: string;
	createdAt: Date;
}

export interface Comment {
	id: number;
	content: string;
	createdAt: Date;
	updatedAt: Date | null;
	deletedAt: Date | null;
	
	isViewed: boolean;
	isApproved ?: boolean
	isRejected ?: boolean
	
	articleId: number;
	author?: Author;
	reply ?: Reply | null;
}

export interface NewReply{
	authorId : number;
	content : string;
}

export interface Reply{
	id : number
	reply ?: any
	content : string;
	createdAt : Date;
	deletedAt : Date | null;
	updatedAt : Date | null
	isViewed : boolean
	author: Author
	isApproved: boolean
	isRejected ?: boolean
}

