import React from 'react';
import axios from 'axios';

export default class Patient extends React.Component {

  constructor(props) {
    super(props);
    this.state = {    
        patientName: ""
    };
  }

  fetchPatientsName = () => {
    axios.get(`http://localhost:8000/patient`)
    .then(res => {
      const patient = res.data;
      this.setState({       
        patientName: patient.patientName,
      });
    })
  };

  render() {
    return (
      <div>
        <button onClick={this.fetchPatientsName}>Get Patient´s name</button>
        {this.state.patientName &&
          <h2>
            The patient´s name is {this.state.patientName} 
          </h2>
        }
      </div>
    );
  }

}