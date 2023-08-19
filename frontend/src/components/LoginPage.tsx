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
        <form style={{maxWidth: "90%", alignItems: "center", marginTop: "50px" }}onSubmit={onLogin}>
            <h3>Login</h3>

            <TextField sx={{ml: 0, width: '100%', border:"#72BBDB", mt:2, }}
                       value={username}
                       onChange={event => setUsername(event.target.value)}
                       placeholder="Username"

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
            />

            <TextField sx={{ml: 0, width: '100%', border:"#72BBDB", mt:2, }}
                       value={password}
                       onChange={event => setPassword(event.target.value)}
                       placeholder="Password"
                       type="password"

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


            />


            <Button sx={{mt: 4, mr: 1, padding: 2, width: '100%',  backgroundColor: "lightseagreen", color:"#27214B", fontWeight:"bold"}}
                    type="submit"
                    variant="contained"
                    className="button-right" >
                Login
            </Button>

            <p style={{textAlign:"center", color:"color"}}> Du hast kein Konto? <b>Registrieren</b></p>
        </form>
        </div>
    )
}