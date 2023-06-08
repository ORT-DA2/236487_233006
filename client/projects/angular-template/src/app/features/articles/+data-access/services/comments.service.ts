import {Injectable} from "@angular/core";
import {Comment, MultipleCommentsResponse, NewReply, SingleCommentResponse} from "@shared/domain";
import {ApiService} from "@core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
	providedIn: 'root',
})
export class CommentsService {
	
	showAddReply$ = new BehaviorSubject<number | null>(null)
	
	constructor(private apiService: ApiService) {}
	
	getComments(articleId: string): Observable<MultipleCommentsResponse> {
		return this.apiService.get<MultipleCommentsResponse>(`/articles/${articleId}/comments`);
	}
	
	deleteComment(commentId: number, slug: string): Observable<void> {
		return this.apiService.delete<void>(`/articles/${slug}/comments/${commentId}`);
	}
	
	addComment(articleId: number, authorId : number, content = ''): Observable<Comment> {
		const body ={
			articleId,
			authorId,
			content
		}
		
		return this.apiService.post<Comment,any>(`/comments/`, body );
	}
	
	addReply(commentId : number, payload : NewReply): Observable<NewReply> {
		return this.apiService.post<NewReply,any>(`/comments/${commentId}/reply`, payload );
	}
	
}
