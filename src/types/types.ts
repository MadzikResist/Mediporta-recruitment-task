export type Order = "asc" | "desc";
export type OrderBy = "popular" | "name";

export interface Tag {
    name: string;
    count: number;
}