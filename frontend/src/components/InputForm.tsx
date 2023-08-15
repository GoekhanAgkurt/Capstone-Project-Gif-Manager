import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Gif, GifWithoutId} from "../models.ts";
import {useNavigate} from "react-router-dom";
import {TextField} from "@mui/material";


type Props = {
    onAddGif?: (data: GifWithoutId) => void
    onEditGif?:(data: Gif) => void
    legend: string
    backUrl: string
    placeholder: string
    gif?: Gif
}

export default function InputForm(props: Props) {



    const [name,setName] = useState<string>("");
    const [description,setDescription ] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [errorName, setErrorName] = useState<string>("");
    const [errorDescription, setErrorDescription] = useState<string>("");
    const [errorPrice, setErrorPrice] = useState<string>("");



    const navigate = useNavigate()


    // Wenn ein gif-Objekt vorhanden ist, initialisiere die State-Variablen mit den alten Werten

    useEffect(() => {
        if (props.gif) {
            setName(props.gif.name);
            setDescription(props.gif.description);
            setPrice(props.gif.price);
        }
    }, [props.gif]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

            if (props.onAddGif){
                const data = {
                name: name,
                description: description,
                price: price
            }
                props.onAddGif(data);
            }

            if (props.onEditGif && props.gif){
                const data = {
                    id: props.gif.id,
                    name: name,
                    description: description,
                    price: price
                }
                props.onEditGif(data);
            }
        navigate("/")
    }




    function handleNameInput(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)

        if(event.target.value.length <= 3) {
            setErrorName("Mindestens vier Buchstaben!")
        }
        else {
           setErrorName("")
        }
    }

    function handleDescriptionInput(event: ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value)
        if(event.target.value.length <= 3) {
            setErrorDescription("Mindestens vier Buchstaben!")
        }
        else {
            setErrorDescription("")
        }
    }

    function handlePriceInput(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;

        if (/^\d+$/.test(inputValue)) {
            setPrice(inputValue);
            setErrorPrice("");
        } else {
            setErrorPrice("Nur Ziffern erlaubt!");
        }
    }


    return (
        <form style={{maxWidth: "100%", alignItems: "center", marginTop: "50px" }} onSubmit={handleSubmit}>
            <fieldset style={{border: "none", fontFamily:"bodoni" }}>
                <legend style={{marginBottom: '0px',  fontWeight: 'bold', fontSize: '25px'}}>Add new Gift</legend>

                <TextField sx={{ml: 0, width: '100%', border:"#72BBDB", mt:2, }}
                           label="Name of the Gift"
                           type="text"
                           value={name}
                           id="name"
                           helperText={"falschhhh"}
                           onChange={handleNameInput}
                           InputLabelProps={{
                               style: {
                                   color: "#72BBDB", fontWeight: "lighter" , backgroundColor:"#27214B", padding: "0 2px 0 5px",
                               },
                           }}
                           InputProps={{
                               style: {
                                   border: "1px solid rgba(114, 187, 219, 0.5)", color: "#72BBDB", fontWeight: "lighter",
                               },
                           }}
                           required


                />
                <p style={{color:"red", marginTop: "5px", marginBottom: "0px", fontSize: "14px"}}> {errorName}</p>

                <TextField sx={{ml: 0, width: '100%', mt:2, borderStyle:"red"}}
                           label="Description"
                           type="text"
                           value={description}
                           id="decription"
                           onChange={handleDescriptionInput}
                           InputLabelProps={{
                               style: {
                                   color: "#72BBDB", fontWeight: "lighter" , backgroundColor:"#27214B", padding: "0 2px 0 5px",
                               },
                           }}
                           InputProps={{
                               style: {
                                   border: "1px solid rgba(114, 187, 219, 0.5)", color: "#72BBDB", fontWeight: "lighter",
                               },
                           }}
                           required
                />
                <p style={{color:"red", marginTop: "5px", marginBottom: "0px", fontSize: "14px"}}> {errorDescription}</p>

                <TextField sx={{ml: 0, width: '100%', Color: "#72BBDB", mt:2 }}
                           label="Price in Euro"
                           type="text"
                           value={price}
                           id="price"
                           onChange={handlePriceInput}
                           InputLabelProps={{
                               style: {
                                   color: "#72BBDB", fontWeight: "lighter" , backgroundColor:"#27214B", padding: "0 2px 0 5px",
                               },
                           }}
                           InputProps={{
                               style: {
                                   border: "1px solid rgba(114, 187, 219, 0.5)", color: "#72BBDB", fontWeight: "lighter",
                               },
                           }}
                           required
                />
                <p style={{color:"red", marginTop: "5px", marginBottom: "0px", fontSize: "14px"}}> {errorPrice}</p>

                <Button sx={{mt: 4, mr: 1, padding: 2, width: '100%',  backgroundColor: "lightseagreen", color:"#27214B", fontWeight:"bold"}} type="submit" variant="contained" className="button-right" >
                    Submit
                </Button>

                <Button sx={{mt: 2, mr: 2, padding: 2, width: '100%', borderColor:"lightseagreen", color:"lightseagreen", fontWeight:"bold" }} type="submit" variant="outlined"  disableElevation onClick={() => navigate("/")}>
                    Cancel
                </Button>
            </fieldset>
        </form>


    )
}
