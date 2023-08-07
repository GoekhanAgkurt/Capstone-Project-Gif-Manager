import GifList from "./components/GifList.tsx";
import Header from "./components/Header.tsx";
import AddPage from "./components/AddPage.tsx";
import {Gif, GifWithoutId} from "./models.ts";
import axios from "axios";
import {Route, Routes, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import EditGif from "./components/EditGif.tsx";

export default function App() {

    const navigate = useNavigate();
    const [gifs, setGifs] = useState<Gif[]>([]);



    useEffect(() => {
        axios.get('api/gifs')
            .then(response => response.data)
            .catch(console.error)
            .then(data => setGifs(data))
    }, [])


    function handleAddGif(data: GifWithoutId) {
        axios.post('/api/gifs', data)
            .then(response => response.data)
            .catch(console.error)
            .then(data => setGifs(data))
    }

    function handleEditGif( data: Gif) {
        axios.put('/api/gifs/'+ data.id, data)
            .then(response => response.data)
            .catch(console.error)
            .then(data => setGifs(data));
    }



    return (
        <>
            <Header/>
            <Routes>
                <Route path={"/add"} element={<AddPage onAddGif={handleAddGif}/>}/>
                <Route path={"/"} element={
                    (<Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <GifList gifs={gifs}/>
                        <Button  sx={{mt: 2, mr: 2, padding: 2, width: '90%', alignItems:"center", borderColor:"rgb(44, 161, 173)", color:"rgb(44, 161, 173)" }} variant="contained"
                                disableElevation
                                onClick={() => navigate("/add")}>
                            + Add new Gif
                        </Button>
                    </Container>)
                }/>
                <Route path="/:id/edit" element={<EditGif onEditGif={handleEditGif}gifs={gifs}/>} />
            </Routes>
        </>
    )
}




