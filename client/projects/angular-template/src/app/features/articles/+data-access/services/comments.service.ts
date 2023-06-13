import {Injectable} from "@angular/core";
import {Comment, MultipleCommentsResponse, NewReply} from "@shared/domain";
import {ApiService} from "@core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
	providedIn: 'root',
})
export class CommentsService {
	
	showAddReply$ = new BehaviorSubject<number | null>(null)
	
	constructor(private api: ApiService) {}
	
	getComments(articleId: string): Observable<MultipleCommentsResponse> {
		return this.api.get<MultipleCommentsResponse>(`/articles/${articleId}/comments`);
	}
	
	deleteComment(commentId: number, slug: string): Observable<void> {
		return this.api.delete<void>(`/articles/${slug}/comments/${commentId}`);
	}
	
	addComment(articleId: number, authorId : number, content = ''): Observable<Comment> {
		const body ={
			articleId,
			authorId,
			content
		}
		
		return this.api.post<Comment,any>(`/comments/`, body );
	}
	
	addReply(commentId : number, payload : NewReply): Observable<Comment> {
		return this.api.post<Comment,any>(`/comments/${commentId}/reply`, payload );
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
		return this.api.get<Comment[]>(`/comments?Isapproved=false`)
	}
}
