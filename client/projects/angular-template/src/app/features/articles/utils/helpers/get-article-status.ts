import {Article, ArticleStatus} from "@shared/domain";

export function getArticleStatus(article : Article){
	if(article.isApproved && !article.isRejected) return ArticleStatus.Approved
	if(!article.isApproved && !article.isRejected) return ArticleStatus.Pending
	if(!article.isApproved && article.isRejected) return ArticleStatus.Rejected
	return "undefined"
}
