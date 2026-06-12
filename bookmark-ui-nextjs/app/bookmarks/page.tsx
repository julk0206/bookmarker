import { fetchBookmarks } from '@/services/api/fetchBookmarks'
import React from 'react'
import Bookmarks from '../components/Bookmarks';
import Pagination from '../components/Pagination';
import SearchFrom from '../components/SearchForm';

// 서버 요청을 위한 컴포넌트
/*
  "searchParams"는 URL 쿼리 문자열을 추출하여 javascript 객체 형태로 만들어줌
  
  ex> URL http://example.com?param1=value&param2=value2 인 경우
   => searchParams는 {param1:value1, param2:value2} 와 같은 형태로 변경해줌
   => page? 는 속성이 있을 수도 있고 없을 수도 있음을 의미. 있으면 string으로 변환해줌

*/

type Props = {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
};

const HOME = async ({ searchParams }: Props) => {
  
  const {page, query} = await searchParams;
  const pageNumber = page ? parseInt(page, 10):1;
  const queryString = query ? String(query) : "";

  const bookmarks = await fetchBookmarks(pageNumber, queryString); // 서버사이드 데이터 fetching 

  return (
    <>
      <h2>Welcome to Bookmark</h2>
      <SearchFrom />
      <Pagination bookmarks={bookmarks} query={query}/>
      
      <ul>
        <Bookmarks bookmarks={bookmarks} />
      </ul>
    </>
  )
}

export default HOME