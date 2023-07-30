import GifList from "./components/GifList.tsx";
import Header from "./components/Header.tsx";
import AddPage from "./components/AddPage.tsx";
import {Gif} from "./models.ts";
import axios from "axios";
import {Route, Routes, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {Container} from "@mui/material";
import {useEffect, useState} from "react";

export default function App() {

    const navigate = useNavigate();
    const [gifs, setGifs] = useState<Gif[]>([]);



    useEffect(() => {
        axios.get('api/gifs')
            .then(response => response.data)
            .catch(console.error)
            .then(data => setGifs(data))
    }, [])


    function handleAddGif(data: { name: string, description: string, price: string }) {
        axios.post('api/gifs', data)
            .then(response => response.data)
            .catch(console.error)
            .then(data => setGifs(data))
    }


    return (
        <>
            <Header/>
            <Routes>
                <Route path={"/add"} element={<AddPage onAddGif={handleAddGif}/>}/>
                <Route path={"/"} element={
                    (<Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <GifList gifs={gifs}/>
                        <Button sx={{bgcolor: "rgb(44, 161, 173)"}} variant="contained"
                                disableElevation
                                onClick={() => navigate("/add")}>
                            + Add Party
                        </Button>
                    </Container>)
                }/>
            </Routes>
        </>
    )
}




