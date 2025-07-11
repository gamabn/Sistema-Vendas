export interface Page<T> {
    content: Array<T>;
    first: number;
    number: number; 
    totalElements: number;
    size: number
}