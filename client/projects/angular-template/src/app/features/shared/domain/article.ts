import {Comment} from "./comments"

export interface Article{
  id: number
  title: string
  private: boolean
  comments : Comment[]
  content: string
  firstImage : string;
  secondImage : string;
  template: number
  createdAt: string
  updatedAt: Date;
  
  
  isApproved ?: boolean
  isRejected ?: boolean
  
  // One or another
  authorId?: number | null;
  author?: Author | null;
}

export interface Author {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
}


export interface ArticleListVM {
  entities: Article[]
  loading: boolean
  error : string | null
}


export interface OffensiveWord{
  id : number;
  word : string;
}


export enum ArticleStatus{
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected'
}
