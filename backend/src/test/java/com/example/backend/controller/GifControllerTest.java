package com.example.backend.controller;

import com.example.backend.model.Gif;
import com.example.backend.repository.GifRepository;
import com.example.backend.service.GifService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class GifControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GifRepository gifRepository;

    @Autowired
    private GifService gifService;


    @Test
    @DirtiesContext
    @WithMockUser
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
        mockMvc.perform(MockMvcRequestBuilders.get("/api/gifs").with(csrf()))
                //then
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expected));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void expectGif_whenGettingById() throws Exception{
        //Given
        List<Gif> gifs = new ArrayList<>();
        gifs.add(new Gif("123", "Pokemon", "Beschreibung","20"));
        gifRepository.insert(gifs);
        String id = gifService.list().get(0).getId();

        String expected = """
                        {
                            "id": "123",
                            "name": "Pokemon",
                            "description": "Beschreibung",
                            "price": "20"
                         }
                """;

        //when
        mockMvc.perform(MockMvcRequestBuilders.get("/api/gifs/" +id))

                // Then
                .andExpect(MockMvcResultMatchers.content().json(expected)).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void expectUpdatedGifList_whenPOSTNewGif() throws Exception {
        // GIVEN
        String gifWithoutId = """
        {
               "name": "Pokemon",
               "description": "Sales on Amazon",
               "price": "20"
        }
                            """;
        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/gifs").content(gifWithoutId).contentType(MediaType.APPLICATION_JSON).with(csrf()))
        // THEN
            .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Pokemon"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].description").value("Sales on Amazon"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].price").value("20"));
    }


    @Test
    @DirtiesContext
    @WithMockUser
    void expectUpdatedGif_whenEditGif() throws Exception{
        //GIVEN
        String initialGifWithoutId = """
              {
               "name": "Barbie Puppe",
               "description": "Sales on Amazon",
               "price": "20"
                }
                                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/api/gifs").content(initialGifWithoutId).contentType(MediaType.APPLICATION_JSON).with(csrf()));
        String gifWithoutIdToPut="""
              {
               "name": "Pokemon",
               "description": "Sales on Amazon",
               "price": "20"
                }
             """;
        String id = gifService.list().get(0).getId();
        String updatedGif = """                   
                       [ {
                           "id": "%s",
                           "name": "Pokemon",
                           "description": "Sales on Amazon",
                          "price": "20"
                         }      ]                  
                """.formatted(id);


        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/gifs/" + id).content(gifWithoutIdToPut).contentType(MediaType.APPLICATION_JSON).with(csrf()))

                //THEN
                .andExpect(MockMvcResultMatchers.content().json(updatedGif)).andExpect(status().isOk());
    }


    @Test
    @DirtiesContext
    @WithMockUser
    void expectedDeleteExistingGif_whenDeleteGif() throws Exception {
        //GIVEN
        List<Gif> gifs = new ArrayList<>();
        gifs.add(new Gif("123","Pokemon", "auf Amazon", "20" ));
        gifRepository.insert(gifs);
        String id = gifService.list().get(0).getId();

        //WHEN
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/gifs/" + id).with(csrf())
        )

        //THEN
                .andExpect(status().isNoContent());
    }

}
