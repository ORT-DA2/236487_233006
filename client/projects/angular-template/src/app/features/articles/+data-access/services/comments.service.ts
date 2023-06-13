import {Injectable} from "@angular/core";
import {Comment, CommentReply, MultipleCommentsResponse} from "@shared/domain";
import {ApiService} from "@core";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
	providedIn: 'root',
})
export class CommentsService {
	
	userNotifications$ = new BehaviorSubject<string | null>(null)
	
	constructor(private api: ApiService) {}
	
	getComments(articleId: string): Observable<MultipleCommentsResponse> {
		return this.api.get<MultipleCommentsResponse>(`/articles/${articleId}/comments`);
	}
	
	
	addComment(articleId: number, authorId : number, content = ''): Observable<Comment> {
		const body ={
			articleId,
			authorId,
			content
		}
		
		return this.api.post<Comment,any>(`/comments/`, body );
	}
	
	addReply(commentId : number, commentReply : CommentReply): Observable<Comment> {
		return this.api.post<Comment,any>(`/comments/${commentId}/reply`, commentReply );
	}
	
	approveComment(commentId : number) : Observable<Comment>{
		return this.api.post<Comment, null>(`/comments/${commentId}/approve`);
	}
	
	rejectComment(commentId : number): Observable<Comment>{
		return this.api.post<Comment, null>(`/comments/${commentId}/reject`);
	}
	
	getMyComments() : Observable<Comment[]>{
		return this.api.get<Comment[]>('/users/activities');
	}
	
	getOffensiveComments() : Observable<Comment[]>{
		return this.api.get<Comment[]>(`/comments?Isapproved=false&IsRejected=false`)
	}
	
	
	getUserNotifications(): Observable<number>{
		return this.api.get<Comment[]>(`/users/activities`).pipe(map(comments => comments.length))
	}
}
