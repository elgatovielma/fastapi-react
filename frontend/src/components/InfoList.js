import React from 'react';
import axios from 'axios';

export default class InfoList extends React.Component {

    state = {
        day: ""
    }

  componentDidMount() {
    axios.get(`http://localhost:8000/day`)
      .then(res => {
        const day = res.data;
        this.setState({ day });
      })
  }

  render() {
    return <h1>Hey!  It's {this.state.day}</h1>;
  }
}