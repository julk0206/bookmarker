package com.min.edu.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.min.edu.domain.Bookmark;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

// JPA를 통해 Pagination 처리를 하면 현재 페이지, 전체 페이지, 끝 여부...
@Getter
@Setter
public class BookmarksDto {

    private List<BookmarkDto> data; // 현재 페이지 데이터 목록
    private Long totalElements; // 전체 데이터 수
    private int totalPages; // 전체 페이지 수
    private int currentPage; // 현재 페이지

    // JSON 결과의 값이 다름 isFirst -> first , isLast -> last
    @JsonProperty(value = "isFirst")
    private boolean isFirst;
    @JsonProperty(value = "isLast")
    private boolean isLast;

    private boolean hasNext;
    private boolean hasPrevious;

    // service에서의 반환타입


    public BookmarksDto(Page<BookmarkDto> bookmarkPage) {
        this.setData(bookmarkPage.getContent()); // JPA 결과 중 데이터(게시글)만 담는다
        this.setTotalElements(bookmarkPage.getTotalElements());
        this.setTotalPages(bookmarkPage.getTotalPages());
        this.setCurrentPage(bookmarkPage.getNumber()+1);
        this.setFirst(bookmarkPage.isFirst());
        this.setLast(bookmarkPage.isLast());
        this.setLast(bookmarkPage.isLast());
        this.setHasNext(bookmarkPage.hasNext());
        this.setHasPrevious(bookmarkPage.hasPrevious());
    }
}
