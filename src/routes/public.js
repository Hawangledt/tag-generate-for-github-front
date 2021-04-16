import React from "react";
import { Switch, Route} from "react-router-dom";
import Signup from "../pages/signup";
import { TagsGitHubProvider } from "../hooks/index";
import Main from "../pages/main";

function Public() {
    return (
        <TagsGitHubProvider accessToken = "">
            <Switch>
                {/* <Route path="/">
                    <Redirect to="/main" />
                </Route> */}
                <Route path="/" exact component={Signup} />
                <Route path="/main" exact component={Main} />
            </Switch>
        </TagsGitHubProvider>
    )
};

export default Public