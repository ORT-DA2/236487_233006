import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Article, OffensiveWord, User} from "@shared/domain";
import {UserFormModel} from "@users/utils/types/user";
import {ApiService} from "@core";

@Injectable({
  providedIn: 'root'
})
export class OffensiveWordsService {
  
  constructor(private api: ApiService) {
  }
  
  getAll(): Observable<OffensiveWord[]> {
    return this.api.get<OffensiveWord[]>('/offensiveWords')
  }
  
  delete(id: number): Observable<void> {
    return this.api.delete<void>('/offensiveWords/' + id);
  }
  
  create(word: string): Observable<OffensiveWord> {
    return this.api.post<OffensiveWord, {word: string}>('/offensiveWords/', {word});
  }
}
