import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import ChatProvider from "./Context/ChatProvider";
import ChatPage from "./Pages/ChatPage";
import HomePage from "./Pages/HomePage";


function App() {
  return (
    <div className="App">
      <ChatProvider>
        <Router>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/home" component={HomePage} exact />
            <Route path="/chats" component={ChatPage} exact />
          </Switch>
        </Router>
      </ChatProvider>
    </div>
  );
}

export default App;
