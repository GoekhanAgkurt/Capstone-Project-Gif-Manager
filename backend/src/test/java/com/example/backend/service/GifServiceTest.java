package com.example.backend.service;
import com.example.backend.model.Gif;
import com.example.backend.model.GifWithoutId;
import com.example.backend.repository.GifRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class GifServiceTest {

    GifRepository gifRepository = mock(GifRepository.class);
    UuIdService uuIdService =mock(UuIdService.class);
    GifService gifService = new GifService(gifRepository, uuIdService);

    @Test
    void expectedAllGifs_whenGetList() {
        //GIVEN
        Gif gif = new Gif("123", "pokemon", "beschreibung", "20");
        List<Gif> expected = new ArrayList<>(List.of(gif));

        //WHEN
        when(gifRepository.findAll()).thenReturn(expected);
        List<Gif> actual = gifService.list();
        //THEN
        verify(gifRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void expectedGif_whenAddGif() {
        // GIVEN
        GifWithoutId gifWithoutId = new GifWithoutId("name", "description", "price");
        String randomId = "123";
        Gif expectedGif = new Gif("123","name", "description", "price");
        // WHEN
        when(uuIdService.getRandomId()).thenReturn(randomId);
        when(gifRepository.insert(expectedGif)).thenReturn(expectedGif);
        Gif actualGif = gifService.addGif(gifWithoutId);
        // THEN
        verify(uuIdService).getRandomId();
        verify(gifRepository).insert(expectedGif);
        assertEquals(expectedGif, actualGif);
    }


}