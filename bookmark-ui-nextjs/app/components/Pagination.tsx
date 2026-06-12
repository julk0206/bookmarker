import React from 'react'
import { BookmarksResponse } from '../types/bookmark'
import Link from 'next/link'

// Props에 BookmarksResponse 안에 페이지 관련 정보
interface PaginationProps {
    bookmarks: BookmarksResponse,
    query?: string,
}

const Pagination = ({ bookmarks, query }: PaginationProps) => {

    const path = "/bookmarks";
    /*
        객체 형태로 만듦 : {pathname:path, query: {page:1}}
        <Link href="./bookmarks?page=1"

        NextJs가 자동으로 객체 형태에서 => ./bookmarks?page=1 롭 ㅕㄴ경해줌
    */
    const firstPage = { pathname:path, query:{page:1}};
    const previousPage = {pathname:path, query:{page:bookmarks.currentPage-1}};
    const nextPage = {pathname:path, query:{page:bookmarks.currentPage+1}};
    const lastPage = {pathname:path, query:{page:bookmarks.totalPages}};

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {/* 이전 */}
                    <li className={`page-item ${bookmarks.hasPrevious ? "" : "disabled"}`} >
                        <Link className="page-link" href={previousPage}>Previous</Link>
                    </li>

                    {/* 이후 */}
                    <li className={`page-item ${bookmarks.hasNext ? "" : "disabled"}`}>
                        <Link className="page-link" href={nextPage}>Next</Link>
                    </li> 
                </ul>
            </nav>
        </div>
    )
}

export default Pagination