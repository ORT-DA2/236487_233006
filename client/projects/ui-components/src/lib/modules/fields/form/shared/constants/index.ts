export const FieldType = {
	TEXT: 'text',
	NUMBER: 'number',
	DATE: 'date',
	SELECT: 'select',
  MULTI_SELECT : 'multi_select',
	CHECK: 'check',
	TEXTAREA: 'textarea',
	FILE_UPLOAD: 'file_upload',
  FORM_GROUP : 'form',
	INVISIBLE : null
} as const;

export const defaultFieldValues: { [key in keyof typeof FieldType]: any } = {
	TEXT: '',
	TEXTAREA: '',
	CHECK: false,
	NUMBER: null,
	DATE: null,
	SELECT: null,
	MULTI_SELECT: null,
	FILE_UPLOAD: null,
	FORM_GROUP: null,
	INVISIBLE: null
};

export type FieldType = typeof FieldType[keyof typeof FieldType];

export const DEFAULT_ERROR_TYPES = [
  { type: 'required', message: 'is required.' , showOnSubmit : false  },
  { type: 'minlength', message: 'minimum length error.', showOnSubmit : false  },
  { type: 'maxlength', message: 'maximum length exceeded.', showOnSubmit : false  },
  { type: 'hasLowerCase', message: 'requires at least one lower case letter.' , showOnSubmit : false},
  { type: 'hasUppercase', message: 'requires at least one upper case letter.' , showOnSubmit : false},
  { type: 'hasNumeric', message: 'requires at least one numeric character.' , showOnSubmit : false },
  { type: 'passwordsNotMatch', message: 'Passwords should match' , showOnSubmit : false},
  { type: 'alphanumericPattern', message: 'should contain only alphanumeric characters' , showOnSubmit : false},
  { type: 'whitespacePattern', message: 'does not accept spaces' , showOnSubmit : false},
  { type: 'emailPattern', message: 'invalid' , showOnSubmit : false},
  { type: 'whitespacePattern', message: 'should not contain spaces' , showOnSubmit : false},
  { type: 'usernameExists', message: 'Username already exists.', showOnSubmit : false },
  { type: 'emailExists', message: 'already exists.', showOnSubmit : false },
  { type: 'invalidCredentials', message: 'Invalid credentials.', showOnSubmit : true },


];
