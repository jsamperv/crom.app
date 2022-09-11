export interface LibraryItem {
    name: string;
    author?: string;
    category: string;
    tag: { name: string; userId?: string }[];
    lended: {status: boolean; since?: Date; userId?: string };
}
