import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.sass';
import SignUp from './pages/signUp/signUp';
import Auth from './pages/auth/auth';
import Bots from './pages/bots/bots';
import SingleBot from './pages/singleBot/singleBot';
import Autoride from './pages/autoride/autoride';
// import SingleScenario from './pages/singleScenario/singleScenario';
import onlyAutorizenUsers from './componens/hoc/onlyAutorizedUsers';
import onlyDontRegistrationUsers from './componens/hoc/onlyNotRegistration';


class App extends React.Component {

  render() {
    return(
        <Router>
          <div>
            <Switch>
              <Route exact path={"/"} render={() => (
                  <Redirect to={'/signUp'}/>
              )}/>
              <Route exact path={"/forgotPassword"} render={() => (
                  <Redirect to={'/signUp'}/>
              )}/>
              <Route
                  exact
                  path={"/signUp"}
                  component={onlyDontRegistrationUsers(SignUp)}
              />
              <Route
                  exact
                  path={"/auth"}
                  component={onlyDontRegistrationUsers(Auth)}
              />
              <Route
                  exact
                  path={"/bots"}
                  component={onlyAutorizenUsers(Bots)}
              />
              <Route
                  exact
                  path={"/bots/:botId/scenario"}
                  component={onlyAutorizenUsers(SingleBot)}
              />
              <Route
                  exact
                  path={"/bots/:botId/autoride"}
                  component={onlyAutorizenUsers(Autoride)}
              />
              {/*<Route*/}
                  {/*exact*/}
                  {/*path={"/scenarios/:scenarioId"}*/}
                  {/*component={onlyAutorizenUsers(SingleScenario)}*/}
              {/*/>*/}
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
