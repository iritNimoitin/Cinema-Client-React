import { useState } from 'react'
import axios from 'axios'
import { Typography, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './Login.css'
import notify from '../Services/Notifications';
import { Switch, Route, Link, BrowserRouter, useHistory, NavLink } from 'react-router-dom'


function Register() {

    const history = useHistory();
    const [user, setUser] = useState({ username: '', password: '' })

    const sendData = async (e) => {
        e.preventDefault();
        let resp = await axios.post("http://localhost:8000/api/users/user/" + user.username + "/");
        console.log(resp.data);
        if (resp.data.username) {
            const headers = {
                username: user.username,
                password: user.password
            }
            let pass = await axios.post("http://localhost:8000/api/users/user/", null, { headers });
            console.log(pass.data);
            history.push('/')
        } else {
            notify.error("your details does not exists in the system,you cant log-in");
        }
    }
    return (
        <div className="App">

            <form >
                <div style={{ width: "400px", borderStyle: "solid", borderColor: "black", borderWidth: "1px", justifyContent: "center", padding: "5px" }}>
                    <Typography variant="h6">
                        Register Page
                    </Typography>
                    <br />
                    <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e => setUser({ ...user, username: e.target.value })} />
                    <br /> <br />
                    <TextField id="outlined-basic" type="password" label="password" variant="outlined" onChange={e => setUser({ ...user, password: e.target.value })} />
                    <br /> <br />

                    <Button size="small" variant="contained" color="primary" onClick={sendData}>
                        Register
                    </Button><br /><br />

                </div>


            </form>

        </div >
    );
}

export default Register;