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
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./components/LoginPage.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";



export default function App() {

    const[user, setUser] = useState<string>();

    const navigate = useNavigate();
    const [gifs, setGifs] = useState<Gif[]>([]);




    useEffect(() => {
        axios.get('api/gifs')
            .then(response => response.data)
            .catch(console.error)
            .then(data => setGifs(data))
    }, [])

    
    function login(username: string, password: string) {
        axios.post("/api/users/login", null, {auth: {username, password}})
            .then((response) => {
                console.log(response)
                setUser(response.data)
                navigate("/")
            })
            .catch((error) => {console.log(error)})
    }

    function handleLogout(){
        axios.post("/api/gif/logout")
            .catch(console.error)
        setUser(undefined)
    }



    function me(){
        axios.get("/api/users/me")
            .then(response=>{
                setUser(response.data)
            })
    }

    useEffect(()=> {
        fetchGifs()
        me()
    }, [])
    
    
    function handleAddGif(data: GifWithoutId) {
        axios.post('/api/gifs', data)
            .then(response => response.data)
            .catch(console.error)
            .then(data => setGifs(data))
        toast.success("Dein Gift wurde erfolgreich hinzugefügt!")

    }

    function handleEditGif( data: Gif) {
        axios.put('/api/gifs/'+ data.id, data)
            .then(response => response.data)
            .catch(console.error)
            .then(data => setGifs(data));
        toast.success("Dein Gift wurde erfolgreich bearbeitet!")


    }

    function fetchGifs() {
        axios.get('api/gifs')
            .then(response => response.data)
            .catch(console.error)
            .then(data => setGifs(data))
    }

    function deleteThisGif(id: string) {
        axios.delete(`/api/gifs/${id}`)
            .catch(error => {
                console.error(error);
            })

            // Lösch aus dem Front  die aktuelle nach dem löschen
            .then(()=> {
                setGifs(gifs.filter(gif => gif.id !== id))
                navigate("/")
            })
        toast.error("Dein Gift wurde gelöscht!")

    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover

                style={{width: "95%", color:"red"}}
            />


            <Header/>
            <p style={{color: "#27214B", fontSize: "14px", padding: "0 20px", textAlign: "right", marginTop:"-45px"}}>{user}   </p>

            <button onClick={handleLogout} style={{ marginRight:"0px" , color: "#27214B", backgroundColor: "red", fontSize: "14px", padding: "5px", }} >logout</button>

            <Routes>

                <Route element={<ProtectedRoutes user={user}/>}>

                  <Route path={"/add"} element={<AddPage onAddGif={handleAddGif}/>}/>

                  <Route path={"/"} element={
                    (<Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <GifList gifs={gifs} onDeleteGif={deleteThisGif}/>
                        <Button  sx={{mt: 2, padding: 2, width: '90%', alignItems:"center", backgroundColor:"lightseagreen", color:"#27214B", fontWeight:"bold" }} variant="contained"
                                 disableElevation
                                 onClick={() => navigate("/add")}>
                            Add a new Gift
                        </Button>
                    </Container>)}/>

                  <Route path="/:id/edit" element={<EditGif onEditGif={handleEditGif} gifs ={gifs}/>} />

                    </Route>

                  <Route path="/login" element={<LoginPage onLogin={login} />}/>
            </Routes>



        </>
    )
}
