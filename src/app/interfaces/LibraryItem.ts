export interface LibraryItem {
    id: string;
    name: string;
    author?: string;
    category: string;
    tag: { name: string; userId?: string }[];
    lended: {status: boolean; since?: number; userId?: string };
    outOfLend: boolean;
}
