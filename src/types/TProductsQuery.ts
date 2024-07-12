export type TProductsQuery = {
    search: string;
    category: string;
    minPrice: number;
    maxPrice: number;
    sortBy: string;
    sortOrder: string;
    page: number;
    limit: number;
}