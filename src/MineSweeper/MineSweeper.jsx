import React, {Component} from 'react';
import Node from './Node/Node';

import './MineSweeper.css';

export default class MineSweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Foo 
        <Node></Node>
      </div>
    )
  }
}