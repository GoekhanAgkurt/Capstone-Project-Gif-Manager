import {FormEvent, useState} from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

type Props = {
    onLogin: (username: string, password: string )=> void
}

export default function LoginPage(props: Props){

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    function onLogin(event: FormEvent){
        event.preventDefault()
        props.onLogin(username, password)
        setUsername("")

    }

    return(
        <div style={{display: "flex", justifyContent: "center",}}>
        <form style= {{maxWidth: "90%", alignItems: "center", marginTop: "50px" }} onSubmit={onLogin}>


            <h3>Login</h3>

            <TextField
                sx={{
                    ml: 0,
                    width: '100%',
                    mt: 2,
                }}
                value={username}
                onChange={event => setUsername(event.target.value)}
                placeholder="Username"
                InputLabelProps={{
                    style: {
                        fontWeight: "lighter",
                        backgroundColor: "#27214B",
                        padding: "0 2px 0 5px",
                    },
                }}
                InputProps={{
                    style: {
                        border: "none", // Set the border color to black
                        fontWeight: "lighter",
                    },
                }}
            />

            <TextField
                sx={{
                    ml: 0,
                    width: '100%',
                    mt: 2,
                }}
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Password"
                type="password"
                InputLabelProps={{
                    style: {
                        color: "black",
                        fontWeight: "lighter",
                        padding: "0 2px 0 5px",
                    },
                }}
                InputProps={{
                    style: {
                        border: "none", //border
                        fontWeight: "lighter",
                    },
                }}
            />


            <Button sx={{mt: 4, mr: 1, padding: 2, width: '100%',  backgroundColor: "lightseagreen", color:"white", fontWeight:"bold"}}
                    type="submit"
                    variant="contained"
                    className="button-right" >
                Login
            </Button>

            <p style={{textAlign:"center", color:"gray", fontWeight:"lighter"}}> Du hast kein Konto? Registrieren</p>
        </form>
        </div>
    )
}