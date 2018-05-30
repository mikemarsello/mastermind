import React, { Component } from 'react';
import { calculateRow } from './logic.js';
import logo from './logo.svg';
import question from './question.jpg';
import './mastermind.css';

class Game extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Mastermind</h1>
        </header>
        <Board />
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['purple', 'orange', 'blue', 'yellow', 'red', 'brown', 'green', 'pink'],
      solution: [],
      rows: [[], [], [], [], [], [], [], [], [], []],
      results: [[], [], [], [], [], [], [], [], [], []],
      playAgain: false,
      activeRow: 0,
      message: 'click a color to play',
      showSolution: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentWillMount() {
    let solutions = [];
    let colors = this.state.colors;
    for (let i = 0; i < 4; i++) {
      let number = Math.floor(Math.random() * 8);
      solutions.push(colors[number]);
    }
    this.setState({
      solution: solutions
    })
  }

  reset() {
    let newState = Object.assign({}, this.state);
    let solutions = [];
    let colors = this.state.colors;
    for (let i = 0; i < 4; i++) {
      let number = Math.floor(Math.random() * 8);
      solutions.push(colors[number]);
    }
    newState = {
      colors: ['purple', 'orange', 'blue', 'yellow', 'red', 'brown', 'green', 'pink'],
      solution: solutions,
      rows: [[], [], [], [], [], [], [], [], [], []],
      results: [[], [], [], [], [], [], [], [], [], []],
      playAgain: false,
      activeRow: 0,
      message: 'click a color to play',
      showSolution: false
    }
    this.setState((state) => {
      return newState;
    });
  }

  handleClick(color) {
    if (!this.state.playAgain) {
      let newState = Object.assign({}, this.state);
      if (this.state.activeRow < 10) {
        newState.rows[this.state.activeRow].push(color);
        if (this.state.rows[this.state.activeRow].length > 3) {
          newState.activeRow += 1;
          let result = calculateRow(this.state.rows[this.state.activeRow], this.state.solution);
          newState.results[this.state.activeRow] = result;
          function checkArray(value) {
            return value === 'red';
          }
          if (result.length === 4) {
            if (result.every(checkArray)){
              let newMessage = 'You won!!!'
              this.setState({
                message: newMessage,
                playAgain: true,
                showSolution: true
              });
            }
          }
        }
        this.setState({
          activeRow: newState.activeRow,
          rows: newState.rows,
          results: newState.results
        });
      }
      else {
        this.setState({
          playAgain: true
        });
      }
      console.log(newState.activeRow);
      console.log(this.state.activeRow);
      if (newState.activeRow === 10) {
        newState.message = 'Nice try';
        newState.showSolution = true;
        newState.playAgain = true;
        this.setState((state) => {
          return newState;
        });
      }
    }
  }

  render() {
    let playAgainButton = (this.state.playAgain) ? <button onClick={this.reset}>Play again?</button> : '';
    return (
      <div id='board'>
        <h3>{this.state.message} {playAgainButton}</h3>
        <Solution showSolution={this.state.showSolution} solution={this.state.solution} colors={this.state.colors}/>
        <div className='rows'>
            <Row result={this.state.results[9]} row={this.state.rows[9]} colors={this.state.colors} key={9}/>
            <Row result={this.state.results[8]} row={this.state.rows[8]} colors={this.state.colors} key={8}/>
            <Row result={this.state.results[7]} row={this.state.rows[7]} colors={this.state.colors} key={7}/>
            <Row result={this.state.results[6]} row={this.state.rows[6]} colors={this.state.colors} key={6}/>
            <Row result={this.state.results[5]} row={this.state.rows[5]} colors={this.state.colors} key={5}/>
            <Row result={this.state.results[4]} row={this.state.rows[4]} colors={this.state.colors} key={4}/>
            <Row result={this.state.results[3]} row={this.state.rows[3]} colors={this.state.colors} key={3}/>
            <Row result={this.state.results[2]} row={this.state.rows[2]} colors={this.state.colors} key={2}/>
            <Row result={this.state.results[1]} row={this.state.rows[1]} colors={this.state.colors} key={1}/>
            <Row result={this.state.results[0]} row={this.state.rows[0]} colors={this.state.colors} key={0}/>
        </div>
        <Pallette colors={this.state.colors} clickHandle={this.handleClick}/>
      </div>
    );
  }
}

class Row extends React.Component {
  render() {
    let result = this.props.result;
    return(
      <div className='row'>
        <div className='cell' key={0}><div className={this.props.row[0]}></div></div>
        <div className='cell' key={1}><div className={this.props.row[1]}></div></div>
        <div className='cell' key={2}><div className={this.props.row[2]}></div></div>
        <div className='cell' key={3}><div className={this.props.row[3]}></div></div>
        <div className='result-box'>
          <div key={0} className={result[0] + ' result-cell'}></div>
          <div key={1} className={result[1] + ' result-cell'}></div>
          <div key={2} className={result[2] + ' result-cell'}></div>
          <div key={3} className={result[3] + ' result-cell'}></div>
        </div>
      </div>
    );
  }
}

class Solution extends React.Component {
  render() {
    let solution = this.props.solution;
    let displaySolution = this.props.showSolution;
    let solutions = [];
    let styles = {
      backgroundImage: (!displaySolution) ? `url(${question})` : 'none'
    }
    for (let i = 0; i < 4; i++) {
      solutions.push(<div key={i} style={styles} className={(displaySolution) ? solution[i] : 'white hide-solution'}></div>)
    }
    return(
      <div id='solution'>
        {solutions}
      </div>
    );
  }
}

function Pallette(props) {
  let pallettes = [];
  let colors = props.colors;
  for (let i = 0; i < colors.length; i++) {
    pallettes.push(<div key={i} className={colors[i] + ' cell'} onClick={() => props.clickHandle(colors[i])}></div>);
  }
  return (
    <div id='pallette'>
      {pallettes}
    </div>
  );
}

export default Game;
