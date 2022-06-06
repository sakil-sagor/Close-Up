import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import ChatPage from "./Pages/ChatPage";
import HomePage from "./Pages/HomePage";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/home" component={HomePage} exact />
          <Route path="/chats" component={ChatPage} exact />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
