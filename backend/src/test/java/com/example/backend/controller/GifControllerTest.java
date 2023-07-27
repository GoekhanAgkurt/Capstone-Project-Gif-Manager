package com.example.backend.controller;

import com.example.backend.model.Gif;
import com.example.backend.repository.GifRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class GifControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GifRepository gifRepository;


    @Test
    @DirtiesContext
    void expectedGifList_whenGettingGifList() throws Exception {
        //Given
        Gif gif = new Gif("123", "pokemon", "beschreibung", "20");
        gifRepository.insert(gif);

        String expected = """
                    [
                        {
                            "id": "123",
                            "name": "pokemon",
                            "description": "beschreibung",
                            "price": "20"
                        }
                    ]
                """;

        //when
        mockMvc.perform(MockMvcRequestBuilders.get("/api/gifs"))
                //then
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expected));
    }
}