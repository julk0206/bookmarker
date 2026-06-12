package com.min.edu.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

// 일반적으로 RestController / Controller는 모든 요청에 대한 오류 사항을 HTML로 반환
// HTML로 반환하면 UI/UX에서 모두 200으로 처리되기 때문에 반환되는 JSON의 값을 통해 new Error() 처리를 해줘야 함
// 따라서 @ControllerAdvice 통해 요청의 오류를 JSON으로 반환한다
// ※※※※ 요청 전에 처리되는 Spring Security는 Security Filter에서 처리해야 한다
// ※※※※ 우선순위를 가져 상위 메소드에 계층구조가 높은 예외는 맨 아래에 위치해서 메소드 작성해야 한다
@ControllerAdvice
public class GlobalExceptionHandler {

    // @Valid에서 오류 발생 시 MethodArgumentNotValidException 발생
    @ExceptionHandler(exception = MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, Object> errorResponse = new HashMap<String, Object>();

        // errors의 JSON 항목들 가져옴
        /*
            "errors": [
        {
            "objectName": "createBookmarkRequest",
            "field": "title",
            "rejectedValue": null,
            "codes": [
                "NotEmpty.createBookmarkRequest.title",
                "NotEmpty.title",
                "NotEmpty.java.lang.String",
                "NotEmpty"
            ],
            "arguments": [
                {
                    "arguments": null,
                    "code": "title",
                    "codes": [
                        "createBookmarkRequest.title",
                        "title"
                    ],
                    "defaultMessage": "title"
                }
            ],
            "bindingFailure": false,
            "code": "NotEmpty",
            "defaultMessage": "제목은 필수 입력값입니다"
        }
    ],
         */
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError)error).getField();
            String errorMessage = error.getDefaultMessage();
            errorResponse.put("field", fieldName);
            errorResponse.put("message", errorMessage);
        });

        errorResponse.put("status", HttpStatus.BAD_REQUEST.value());

//        return new ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST);
        return ResponseEntity.badRequest().body(errorResponse); // static 방식 권장
    }

}
