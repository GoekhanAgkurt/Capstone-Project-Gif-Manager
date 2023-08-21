package com.example.backend.service;
import com.example.backend.model.Gif;
import com.example.backend.model.GifWithoutId;
import com.example.backend.repository.GifRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class GifServiceTest {

    GifRepository gifRepository = mock(GifRepository.class);
    UuIdService uuIdService =mock(UuIdService.class);
    GifService gifService = new GifService(gifRepository, uuIdService);

    @Test
    void expectedAllGifs_whenGetList() {
        //GIVEN
        Gif gif = new Gif("123", "pokemon", "beschreibung", "20", false);
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
        GifWithoutId gifWithoutId = new GifWithoutId("name", "description", "price",false);
        String randomId = "123";
        Gif expectedGif = new Gif("123","name", "description", "price", false);
        // WHEN
        when(uuIdService.getRandomId()).thenReturn(randomId);
        when(gifRepository.insert(expectedGif)).thenReturn(expectedGif);
        Gif actualGif = gifService.addGif(gifWithoutId);
        // THEN
        verify(uuIdService).getRandomId();
        verify(gifRepository).insert(expectedGif);
        assertEquals(expectedGif, actualGif);
    }

    @Test
    void expectedEditedGifs_whenEditingGif() {
        //GIVEN
        String id = "123";
        GifWithoutId gifWithoutId = new GifWithoutId("name", "description", "price", false);
        Gif expected = new Gif("123", "name", "description", "price", false);
        //WHEN
        when(gifRepository.findById(id)).thenReturn(Optional.of(expected));
        when(gifRepository.save(expected)).thenReturn(expected);
        Gif actual = gifService.editGifById(gifWithoutId, id);

        //THEN
        verify(gifRepository).findById(id);
        verify(gifRepository).save(expected);
        assertEquals(expected,actual);
    }

    @Test
    void expectedDeleteExistingGif_whenDeleteGif() {
        //when
        String gifId = "123";
        Gif existingGif = new Gif();
        //when
        when(gifRepository.findById(gifId)).thenReturn(Optional.of(existingGif));

        gifService.deleteGif(gifId);

        //then
        verify(gifRepository, times(1)).delete(existingGif);
    }

}
