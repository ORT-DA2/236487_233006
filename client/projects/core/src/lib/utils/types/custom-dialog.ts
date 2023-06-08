export interface DialogPayload {
	title?: string;
	text?: string;
	data?: any;
}

export interface DialogAction {
	label : string;
	value : DialogActionValue
}

export type DialogActionValue = 'edit' | 'delete';

export interface ActionSelected{
	originalEvent : PointerEvent
	value : DialogActionValue;
}


export const DIALOG_ACTION = {
	EDIT : 'edit' as const,
	DELETE : 'delete' as const
}
