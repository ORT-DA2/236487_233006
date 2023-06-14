export declare const FieldType: {
    readonly TEXT: "text";
    readonly NUMBER: "number";
    readonly DATE: "date";
    readonly SELECT: "select";
    readonly MULTI_SELECT: "multi_select";
    readonly CHECK: "check";
    readonly TEXTAREA: "textarea";
    readonly FILE_UPLOAD: "file_upload";
    readonly FORM_GROUP: "form";
    readonly INVISIBLE: null;
};
export declare const defaultFieldValues: {
    [key in keyof typeof FieldType]: any;
};
export type FieldType = typeof FieldType[keyof typeof FieldType];
export declare const DEFAULT_ERROR_TYPES: {
    type: string;
    message: string;
    showOnSubmit: boolean;
}[];
