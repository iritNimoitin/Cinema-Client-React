import { Redirect, Route, Switch } from "react-router";
import Register from '../Components/Register';
import Login from '../Components/Login';
import Menu from '../Components/Menu';
import AllUsers from "../Components/AllUsers";
import UpdateUser from "../Components/UpdateUser";
import AddUser from "../Components/AddUser";
import AllMovies from "../Components/AllMovies";

function Routing() {
    return (
        <div className="Routing">
            <Switch>
                {/* <Route path="/home" component={MainPage} exact /> */}
                <Route exact path="/" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/menu" component={Menu} />
                <Route exact path="/users" component={AllUsers} />
                <Route exact path="/updateUser/:id" component={UpdateUser} />
                <Route exact path="/addUser" component={AddUser} />
                <Route exact path="/movies" component={AllMovies} />
            </Switch>
        </div>
    );
}


export default Routing;