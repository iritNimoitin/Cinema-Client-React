import { useState } from 'react'
import axios from 'axios'
import { Typography, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './Login.css'
import { Switch, Route, Link, BrowserRouter, useHistory, NavLink } from 'react-router-dom'
import notify from '../Services/Notifications';




function Login() {

    const [user, setUser] = useState({ username: '', password: '' })
    const history = useHistory();

    const sendData = async (e) => {
        e.preventDefault();
        const headers = {
            username: user.username,
            password: user.password
        }
        let resp = await axios.post("http://localhost:8000/api/login/", null, { headers });
        console.log(resp.data);
        if (resp.data.valid) {
            notify.success('you have been logged successfully!')
            history.push('/menu');
        } else {
            notify.error("your details does not exists in the system,please register");
            history.push('/register');
        }
    }

    return (
        <div className="App">

            <form onSubmit={e => sendData(e)}>
                <div style={{ width: "400px", borderStyle: "solid", borderColor: "black", borderWidth: "1px", justifyContent: "center", padding: "5px" }}>
                    <Typography variant="h6">
                        Login Page
                    </Typography>
                    <br />
                    <TextField id="outlined-basic" label="Username" variant="outlined" onChange={e => setUser({ ...user, username: e.target.value })} />
                    <br /> <br />
                    <TextField id="outlined-basic" type="password" label="password" variant="outlined" onChange={e => setUser({ ...user, password: e.target.value })} />
                    <br /> <br />

                    <Button size="small" variant="contained" color="primary" onClick={sendData} >
                        Login
                    </Button><br />
                    <br />
                    {/* New User ?  <Link to={"/register"} >Create Account</Link> */}
                    New User ?  <NavLink to="/register">Create Account</NavLink>
                </div>


            </form>

        </div >
    );
}

export default Login;