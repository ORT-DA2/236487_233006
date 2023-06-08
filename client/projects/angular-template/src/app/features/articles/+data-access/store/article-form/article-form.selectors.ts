import {articleFormFeature} from "@articles/+data-access/store/article-form/article-form.reducers";


const {
	selectLoaded,
	selectLoading,
	selectError,
} = articleFormFeature;

export const articleFormQuery = {
	selectLoaded,
	selectLoading,
	selectError
};
