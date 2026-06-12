import { BookmarksResponse } from '@/app/types/bookmark';
import axios from 'axios';
import React from 'react'

// const API_BASE_URL="http://localhost:8080"; // UI(Local) + API(Local)
// const API_BASE_URL="http://host.docker.internal:8080"; // UI(Docker) + API(Local)

const getApiUrl = () =>{
    const serverApiUrl = process.env.SERVER_SIDE_API_BASE_URL;
    const clientApiUrl = process.env.NEXT_PUBLIC_CLIENT_SIDE_API_BASE_URL;

    if (typeof window == 'undefined') {
        console.log('서버 사이드 실행 - 사용 URL', serverApiUrl);
        return serverApiUrl || clientApiUrl;
    }

    console.log('클라이언트 사이드 실행 - 사용 URL', clientApiUrl);
    return clientApiUrl;
}


// 전체 조회  + Page 조회 + 검색어 조회
// TypeScript는 javascript에서 타입이 정해지지 않는 동적 타입을 사용하지 X 매핑되는 타입을 지정
export const fetchBookmarks = async(page: number, query?:string):Promise<BookmarksResponse> => {
    let apiUrl = getApiUrl();
    const resp = await axios.get<BookmarksResponse>(`${apiUrl}/api/bookmarks?page=${page}&query=${query}`);
    console.log(resp.data);
    return resp.data;
}


// export async function fetchBookmarkss(page:number, query:string): Promise<BookmarksResponse> {
//     const resp = await fetch(`http://localhost:8080/api/bookmarks?page=${page}&query=${query}`);
//     if(!resp.ok) {
//         throw new Error('잘못된 결과');
//     } 
//     return resp.json();
// }

// 입력 ${API_BASE_URL}/api/bookmarks, POST, CreateBookmarkRequest.java(JSON)
// => 예외 (validation 처리 -> HTML 반환 -> @ControllerAdvice -> 선택 Exception -> JSON msg, Status, field)
export const saveBookmark = async(bookmark: {title:string, url:string}) => {
    let apiUrl = getApiUrl();
    try{
        const resp = await axios.post(`${apiUrl}/api/bookmarks`, bookmark);
        return resp.data;
    } catch(error) {
        //에러가 발생했을 경우 처리 메시지
        console.log("Error Saving Bookmarks", error);
        throw new Error("Bookmark 저장에 실패하였습니다"); // 오류 throw하여 호출자에게 전달
    }
}