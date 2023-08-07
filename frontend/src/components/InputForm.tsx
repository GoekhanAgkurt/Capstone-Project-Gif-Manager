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



    const borderStyle: React.CSSProperties = {
        color: "1px solid #72BBDB",
    };


    function handleNameInput(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
    }

    function handleDescriptionInput(event: ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value)
    }    function handlePriceInput(event: ChangeEvent<HTMLInputElement>) {
        setPrice(event.target.value)
    }






    return (
        <form onSubmit={props.gif?handleSubmit:handleSubmit}>
            <fieldset style={{border: "none", fontFamily:"bodoni" }}>
                <legend style={{marginBottom: '0px',  fontWeight: 'bold', fontSize: '25px'}}>Add new Gift</legend>

                <p style={{color:"#72BBDB"}}>Fill out the textfields so everybody can Giftwishes</p>

                <TextField sx={{ml: 0, width: '100%', border:"#72BBDB", mt:2, }}
                           label="Name"
                           type="text"
                           value={name}
                           id="name"
                           onChange={handleNameInput}
                           InputProps={{
                               style: borderStyle
                           }}
                           required
                />
                <TextField sx={{ml: 0, width: '100%', mt:2, borderStyle:"red"}}
                           label="Description"
                           type="text"
                           value={description}
                           id="decription"
                           onChange={handleDescriptionInput}
                           required
                />
                <TextField sx={{ml: 0, width: '100%', border:"#72BBDB", mt:2 }}
                           label="Price"
                           type="text"
                           value={price}
                           onChange={handlePriceInput}
                           id="price"
                           required
                />
                <Button sx={{mt: 4, mr: 1, padding: 2, width: '100%',  bgcolor: "rgb(44, 161, 173)"}} type="submit" variant="contained" className="button-right" >
                    Submit
                </Button>
                <Button sx={{mt: 2, mr: 2, padding: 2, width: '100%', borderColor:"rgb(44, 161, 173)", color:"rgb(44, 161, 173)" }} type="submit" variant="outlined"  disableElevation onClick={() => navigate("/")}>
                    Cancel
                </Button>
            </fieldset>
        </form>


    )
}
