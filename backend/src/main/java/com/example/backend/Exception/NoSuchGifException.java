package com.example.backend.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Gift not found!")
public class NoSuchGifException extends RuntimeException {

    public NoSuchGifException(String s) {
        super(s);
    }
}
