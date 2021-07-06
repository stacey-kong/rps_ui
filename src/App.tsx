import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/" component={Dashboard} />

        <Redirect from="*" to="/" />
      </Switch>
    </HashRouter>
  );
}
