import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Playground from "./pages/Playground";
import { useWeb3Context } from "./context/web3";

export default function App() {
  const { connection } = useWeb3Context();

  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/">
          {connection ? <Redirect to="/playground" /> : <Dashboard />}
        </Route>
        {connection && (
          <Route path="/playground">
            <Playground />
          </Route>
        )}
        <Redirect from="*" to="/" />
      </Switch>
    </HashRouter>
  );
}
