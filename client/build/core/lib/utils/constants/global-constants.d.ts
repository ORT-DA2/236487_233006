export declare const PAGES: {};
export declare const REGEX: {
    EMAIL: RegExp;
    ALPHANUMERIC: RegExp;
    NO_WHITESPACE: RegExp;
};
export declare const ASSETS: {};
export declare enum DialogType {
    User = "user",
    Delete = "delete",
    Register = "register",
    AdminNotification = "adminNotification"
}
export type Dialog = {
    [key in DialogType]?: boolean;
};
export declare const InitialDialogState: Dialog;
export declare enum RoleType {
    Admin = 1,
    Blogger = 2
}
export declare enum ImagePosition {
    Top = 0,
    Left = 1,
    Bottom = 2,
    TopAndBottom = 3
}
export declare enum FilterFrom {
    AllArticles = "articles",
    Recent = "recent"
}
