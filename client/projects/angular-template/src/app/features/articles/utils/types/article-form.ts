import {CustomFileUpload} from "@ui-components";


export interface NewArticle{
	authorId : number;
	title : string;
	content : string;
	private : boolean;
	template : number;
	firstImage : string;
	secondImage : string;
}

export interface ArticleForm {
	title : string;
	content : string;
	template : number;
	private : boolean;
	image : CustomFileUpload[];
	
	// Only present if editing, this is hided
	// from ui, but saved in form data
	id?: number
	authorId?: number;
	createdAt?: string
	updatedAt?: any
	comments ?: any[]
}

export enum TemplateOption{
	BOTTOM = 0,
	LEFT = 1,
	TOP = 2,
	TOP_AND_BOTTOM = 3
}


export interface ImportRequest{
	importerName : string;
	filePath : string
}

export interface FormImportData{
	importerName : number;
	filePath : string
}
