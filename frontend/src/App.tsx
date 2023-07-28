import GifList from "./components/GifList.tsx";
import Header from "./components/Header.tsx";
import {Gif, GifWithoutId} from "./models.ts";
import axios from "axios";
import {Route, Routes, useNavigate,} from "react-router-dom";
import Button from "@mui/material/Button";
import {Alert, Container, Stack} from "@mui/material";
import AddPage from "./components/AddPage.tsx";
import {useState} from "react";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";

export default function App() {

    const [gifs, setGifs] = useState<Gif[]>([]);
    const [user] = useState<string>();
    const [isAddSuccess, setIsAddSuccess] = useState<boolean>(false);
    const [openWarningToast, setOpenWarningToast] = useState(false);

    const navigate = useNavigate();


    function handleAddGif(data: GifWithoutId) {
        axios.post('api/gifs', data)
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                setOpenWarningToast(true);
            })
            .then(data => {
                setGifs(data)
            });
        navigate("/")
        setIsAddSuccess(true)
        const timeoutId = setTimeout(() => {
            setIsAddSuccess(false)
        }, 4000)
        return () => {
            clearTimeout(timeoutId)
        }
    }


    return (
        <>
            <Header/>
           <GifList/>
            <Stack sx={{width: '100%', m: 0, p: 0,}}>
                {isAddSuccess && (
                    <Alert severity="success">You added your Party successfully! </Alert>
                )}
                {openWarningToast && (
                    <Alert severity="warning">Are you logged in?</Alert>
                )}
            </Stack>
            <Routes>
                <Route path={"/add"} element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/add"} element={<AddPage onAddGif={handleAddGif} />} />
                </Route>
                <Route path={"/"} element={
                    (<Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
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




