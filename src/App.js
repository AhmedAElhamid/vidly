import React, {Component} from 'react';
import {Route, Switch, Redirect} from "react-router-dom"
import {ToastContainer} from "react-toastify";
import Movies from './components/movies'
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/common/navBar";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/common/logout";
import {getCurrentUser} from "./services/userService";
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

class App extends Component {
    state = {}

    componentDidMount() {
        const user = getCurrentUser()
        this.setState({user})
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <NavBar user={this.state.user}/>
                <main className="container">
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/movies"
                               render={props => <Movies {...props} user={this.state.user}/>}/>
                        <Route path="/customers" component={Customers}/>
                        <Route path="/rentals" component={Rentals}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Redirect from="/" exact to="/movies"/>
                        <Redirect to="/not-found"/>
                    </Switch>


                </main>
            </div>
        );
    }
}

export default App;

