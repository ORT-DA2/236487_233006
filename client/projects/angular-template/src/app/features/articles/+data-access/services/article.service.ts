import {Injectable} from '@angular/core'
import {forkJoin, map, Observable} from 'rxjs'
import {ApiService, FilterFrom} from '@core'

import {Store} from '@ngrx/store'
import {authQuery} from '@auth/+data-access/store/auth.selectors'
import {ArticleForm, FormImportData, ImportRequest, NewArticle} from '@articles/utils/types/article-form'
import {Article, User} from '@shared/domain'
import {IOption} from "@ui-components";

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  author$ = this.store.select(authQuery.selectLoggedUser)
  author: User | null = null

  constructor(private api: ApiService, private store: Store) {
    this.author$.subscribe((u) => {
      this.author = u
    })
  }

  filterBy(filterBy: string | null = null, from : FilterFrom): Observable<Article[]> {
    if (filterBy !== null && from === FilterFrom.Recent) {
      return this.api.get<Article[]>(`/articles/recent?q=${filterBy}`)
    }
  
    if (filterBy !== null && from === FilterFrom.AllArticles) {
      return this.api.get<Article[]>(`/articles?q=${filterBy}`)
    }
  
  
    if(filterBy === null && from === FilterFrom.Recent){
      return this.api.get<Article[]>('/articles/recent')
    }
    if(filterBy === null && from === FilterFrom.AllArticles){
      return this.api.get<Article[]>('/articles')
    }
    
    
    // Default :
    return this.api.get<Article[]>('/articles')
  }
  
  getRecentArticles(userId: number | null  = null) : Observable<Article[]> {
    if(userId === null){
      return this.api.get<Article[]>('/articles/recent')
    }
  
    return this.api.get<Article[]>(`/articles/recent?authorId=${userId}`)
  }
  
  getAllArticles(userId: number | null = null) : Observable<Article[]>{
    if(userId === null){
      return this.api.get<Article[]>('/articles')
    }
  
    return this.api.get<Article[]>(`/articles?authorId=${userId}`)
  }
  
  deleteArticle(articleId: number): Observable<void> {
    return this.api.delete<void>('/articles/' + articleId)
  }

  publishArticle(article: ArticleForm): Observable<Article> {
    if (article?.id)
      return this.api.put<Article, Article>(
        '/articles/' + article.id,
        this.toArticle(article)
      )

    return this.api.post<Article, NewArticle>(
      '/articles/',
      this.toNewArticle(article)
    )
  }

  getArticle(articleId: number): Observable<Article> {
    return this.api.get<Article>('/articles/' + articleId)
  }
  
  toNewArticle(article: ArticleForm): NewArticle {
    if (this.author && this.author.id) {
      return {
        authorId: this.author.id,
        private: article.private,
        content: article.content,
        firstImage: article.image[0]?.data || '',
        secondImage: article.image[1]?.data || '',
        template: article.template,
        title: article.title,
      }
    } else {
      throw new Error('Author or author ID is not defined')
    }
  }

  toArticle(articleForm: ArticleForm): Article {
    if (articleForm.id === undefined || articleForm.id === null) {
      throw new Error('ArticleForm must have an id.')
    }
    if (articleForm.authorId === undefined || articleForm.authorId === null) {
      throw new Error('ArticleForm must have an authorId.')
    }

    return {
      id: articleForm.id,
      authorId: articleForm.authorId,
      title: articleForm.title,
      private: articleForm.private,
      comments: articleForm.comments || [],
      content: articleForm.content,
      firstImage: articleForm.image[0]?.data || '',
      secondImage: articleForm.image[1]?.data || '',
      template: articleForm.template,
      createdAt: articleForm.createdAt || '',
      updatedAt: new Date(),
    }
  }
  
  approveArticle(articleId : number) : Observable<Article>{
    return this.api.post<Article, null>(`/articles/${articleId}/approve`);
  }
  
  rejectArticle(articleId : number): Observable<Article>{
    return this.api.post<Article, null>(`/articles/${articleId}/reject`);
  }
  
  markAllCommentsAsViewed(articleId : number): Observable<Article>{
    return this.api.post<Article, null>(`/articles/${articleId}/markAllCommentsAsViewed`);
  }
  
  getOffensiveItems(): Observable<{articles: number, comments: number}> {
    return forkJoin({
      articles: this.getOffensiveArticles(),
      comments: this.getOffensiveComments(),
    }).pipe(
      map(response => ({
        articles: response.articles.length,
        comments: response.comments.length
      }))
    )
  }

  getOffensiveArticles() : Observable<Article[]>{
    return this.api.get<Article[]>(`/articles?Isapproved=false`)
  }
  
  getOffensiveComments() : Observable<Comment[]>{
    return this.api.get<Comment[]>(`/comments?Isapproved=false&IsRejected=false`)
  }
  
  getImporterOptions(): Observable<IOption[]> {
    return this.api.get<string[]>(`/importers`).pipe(
      map(strings => strings.map((description, id) => ({ id, description })))
    );
  }
  
  
  importArticles(data : ImportRequest) {
    return this.api.post<any, ImportRequest>(`/importers/import`, data);
  }
}
