export interface EntityState<T> {
    data: T | null;
    loaded: boolean;
    loading: boolean;
    error: string | null;
}
export interface EntityListState<T> {
    entities: T[];
    loaded: boolean;
    loading: boolean;
    error: string | null;
}
