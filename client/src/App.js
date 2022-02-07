import React, {useContext} from "react"
import { Route, Switch, Redirect} from "react-router-dom";
import Navbar from "./components/Navbar.js"
import Auth from "./components/Auth.js"
import Profile from "./components/Profile.js"
import Public from "./components/Public.js"
import Footer from "./components/Footer.js";
import NotFound from "./components/NotFound.js";
import ProtectedRoute from "./components/ProtectedRoute.js"
import { UserContext } from "./context/UserProvider.js"
import './App.css'


export default function App() {

    const { token, logout } = useContext(UserContext)

    return (

        <><div className="wrapper">
        {token && <Navbar logout={logout} />}
        <Switch>
          <Route
            exact path="/"
            render={() => token ? <Redirect to="/profile" /> : <Auth />} />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            redirectTo="/"
            token={token} />
          <ProtectedRoute
            path="/public"
            component={Public}
            redirectTo="/"
            token={token} />

            
          <Route path="*" element={<NotFound />} render={() => <NotFound />} />

        </Switch>
      </div><Footer /></>
       
    )
}