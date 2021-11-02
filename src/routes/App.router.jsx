import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./index";

export const AppRouter = () => {
    //const {isAuth, isLoading} = useContext(AuthContext);
    const isAuth = false
    return (
        isAuth
            ?
            <Switch>
                {privateRoutes.map(el => {
                    return <Route key={el.path} component={el.component} exact={el.exact} path={el.path}/>
                })}
                <Redirect to="/"/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(el => {
                    return <Route key={el.path} component={el.component} exact={el.exact} path={el.path}/>
                })}
                <Redirect to="/login"/>
            </Switch>
    )
}