import React from "react";
import springboot from "../api/springboot";
import "./App.css";

const ServerStat = {
  UP: {
    color: "green"
  },
  DOWN: {
    color: "red"
  }
};

class App extends React.Component {
  state = { server: "" };

  checkServerHealth = async () => {
    try {
      await springboot.get("/actuator/health");
      this.setState({ server: ServerStat["UP"] });
    } catch (error) {
      this.setState({ server: ServerStat["DOWN"] });
    }
  };

  componentDidMount() {
    setInterval(() => this.checkServerHealth(), 800);
  }

  render() {
    const { color } = this.state.server;

    return (
      <div className="main">
        <div className="ui card">
          <div className="content">
            <h3>Spring Boot Server Monitor</h3>
          </div>
          <i className={`massive server icon ${color}`} />
        </div>
      </div>
    );
  }
}

export default App;
