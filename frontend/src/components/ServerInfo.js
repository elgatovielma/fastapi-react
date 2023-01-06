import React from 'react';
import axios from 'axios';

export default class ServerInfo extends React.Component {

  constructor(props) {
    super(props);
    this.minutes = ["1", "5", "15"];
    this.isClientSide = true;
    this.state = {    
      loads: [],
      date: ""
    };
  }

  componentDidMount = () => {
    let clientDate = new Date()
    const offset = clientDate.getTimezoneOffset()
    clientDate = new Date(clientDate.getTime() - (offset*60*1000))
    this.setState({       
      loads: [],
      date: clientDate.toISOString().split('T')[0]
    });
  }

  fetchServerData = () => {
    axios.get(`http://localhost:8000/server-info`)
    .then(res => {
      const serverIfo = res.data;
      this.setState({       
        loads: serverIfo.loads,
        date: serverIfo.date
      });
      this.isClientSide = false;
    })
  };

  render() {
    return (
      <div>
        {this.state.date &&
          <h2>
            Current date on  { this.isClientSide ? "Client" : "Server" } side: {this.state.date} 
          </h2>
        }
        <button onClick={this.fetchServerData}>fetch Server Data</button>
        {this.state.loads.length > 0 &&
          <ul>
            {
              this.state.loads
                .map((load, index) =>
                  <li key={index}>Load over the last {this.minutes[index]} minute: {load}</li>
                )
              }
          </ul>
        }
      </div>
    );
  }

}