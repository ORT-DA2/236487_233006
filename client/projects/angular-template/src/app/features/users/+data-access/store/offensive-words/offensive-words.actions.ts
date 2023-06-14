import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {UserFormModel} from "@users/utils/types/user";
import {OffensiveWord, User} from "@shared/domain";


export const wordsActions = createActionGroup({
	source: 'Offensive Words',
	events: {
		'Reset' : emptyProps(),
		
		'Load Words': emptyProps(),
		'Load Words Success': props<{ words: OffensiveWord[] }>(),
		'Load Words Failure': props<{ error: string }>(),
		
		'Create Word' : props<{ word : string}>(),
		//'Create Word Success': props<{ word: string}>(),
		'Create Word Failure': props<{ error: string }>(),
		
		'Delete Word ' : props<{ id : number}>(),
		'Delete Word Success': props<{ word: string}>(),
		'Delete Word Failure': props<{ error: string }>(),
	},
});
