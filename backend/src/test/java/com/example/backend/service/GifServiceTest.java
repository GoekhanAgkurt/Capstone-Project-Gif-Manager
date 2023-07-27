package com.example.backend.service;

import com.example.backend.model.Gif;
import com.example.backend.repository.GifRepository;
import org.junit.jupiter.api.Test;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class GifServiceTest {

    GifRepository gifRepository = mock(GifRepository.class);
    GifService gifService = new GifService(gifRepository);

    @Test
    void expectedAllGifs_whenGetList() {
        //GIVEN
        Gif gif = new Gif("123", "pokemon", "beschreibung", "20");
        List<Gif> expected = new ArrayList<>(List.of(gif));

        //WHEN
        when(gifRepository.findAll()).thenReturn(expected);
        List<Gif> actual = gifService.getListOfGifs();
        //THEN
        verify(gifRepository).findAll();
        assertEquals(expected, actual);
    }
}