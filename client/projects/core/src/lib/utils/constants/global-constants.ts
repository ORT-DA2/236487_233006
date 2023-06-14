export const PAGES = {
	// LOGIN: '/login',   <= Example
};

export const REGEX = {
   EMAIL : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
   ALPHANUMERIC: /^[a-zA-Z0-9]*$/ ,// alphanumeric: must contain only letters and numbers
   NO_WHITESPACE: /^\S*$/
};

export const ASSETS = {
	// LOGO_COLOR: 'assets/svg/logo-color.svg',   <= Example
};

export enum DialogType {
  User = 'user',
  Delete = 'delete',
  Register = 'register',
  AdminNotification = 'adminNotification'
}

export type Dialog = {
  [key in DialogType]?: boolean
}

export const InitialDialogState: Dialog = {
  [DialogType.Register]: false,
  [DialogType.User]: false,
  [DialogType.Delete]: false,
  [DialogType.AdminNotification]: false,
  // ... other initial dialog states
}


export enum RoleType {
  Admin = 1,
  Blogger = 2
}

export enum ImagePosition{
  Top = 0,
  Left = 1,
  Bottom = 2,
  TopAndBottom = 3
}

export enum FilterFrom{
  AllArticles = 'articles',
  Recent = 'recent'
}
