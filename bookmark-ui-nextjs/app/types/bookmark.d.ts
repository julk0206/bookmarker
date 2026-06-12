export interface BookmarksResponse {
    data: Bookmark[],
    totalElements: number,
    totalPages: number,
    currentPage: number,
    isFirst: boolean,
    isLast: boolean,
    hasNext: boolean,
    hasPrevious: boolean,
}

export interface Bookmark {
    id: number,
    title: string,
    url: string,
    createdAt: Date,
}