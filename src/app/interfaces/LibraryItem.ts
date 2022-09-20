export interface LibraryItem {
    id?: string;  // When you addDoc you don't need any id.
    name: string;
    author?: string;
    category: string;
    tag?: { name: string; userId?: string }[];
    lended: {status: boolean; since?: number; userId?: string; displayName?: string };
    outOfLend: boolean;
    donatedBy?: string;
}
