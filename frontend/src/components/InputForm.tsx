import {ChangeEvent, FormEvent, useState} from "react";
import Button from "@mui/material/Button";
import {GifWithoutId} from "../models.ts";
import {useNavigate} from "react-router-dom";
import {TextField} from "@mui/material";


type Props = {
    onSubmitGif: (data: GifWithoutId) => void
    gif: GifWithoutId | undefined
    legend: string
    backUrl: string
    placeholder: string
}

export default function InputForm(props: Props) {

    const [name,setName] = useState<string>("");
    const [description,setDescription ] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    const navigate = useNavigate()

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = {
            name: name,
            description: description,
            price: price
        }
        props.onSubmitGif(data)
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
        <form onSubmit={handleSubmit}>
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
