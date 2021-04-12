import React from "react";
import { Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../pages/main"


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route path="/">
                    <Redirect to="/main" />
                </Route> */}
                <Route path="/" exact component={Main} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes