import { Typography } from "@material-ui/core";
import Routing from "../Services/Routing";
import './Home.css'

function Home() {
    return (

        <div className='Home'>
            <Typography variant="h3" component="h2">
                Welcome to Cinema Website
            </Typography>
            <Routing />

        </div>

    );
}

export default Home;