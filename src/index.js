import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
        onKeyPress={e => this.props.onKeyPress(e)}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: this.props.squares,
      selected: null
    };
  }

  handleKeyPress = event => {
    const squares = this.state.squares.slice();
    const i = this.state.selected;
    const number = Number(event.key);
    if (i != null && squares[i] === null) {
      if (
        !checkSquare(squares, number, i) &&
        !checkLine(squares, number, i) &&
        !checkRow(squares, number, i)
      ) {
        if (event.key === "1") {
          squares[i] = 1;
        } else if (event.key === "2") {
          squares[i] = 2;
        } else if (event.key === "3") {
          squares[i] = 3;
        } else if (event.key === "4") {
          squares[i] = 4;
        } else if (event.key === "5") {
          squares[i] = 5;
        } else if (event.key === "6") {
          squares[i] = 6;
        } else if (event.key === "7") {
          squares[i] = 7;
        } else if (event.key === "8") {
          squares[i] = 8;
        } else if (event.key === "9") {
          squares[i] = 9;
        }
      } else {
        alert("Wrong!");
      }
    }
    let empty = squares.filter((i, j) => {
      return i;
    });
    if (81 - empty.length === 0) {
      alert("You won!");
    }
    this.setState({
      squares: squares,
      selected: i
    });
  };

  handleClick(i) {
    this.setState({
      squares: this.state.squares,
      selected: i
    });
    // alert(this.state.selected);
  }

  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.state.squares[i]}
        // value={Math.floor(i/9)}
        onClick={() => this.handleClick(i)}
        onKeyPress={e => this.handleKeyPress(e)}
      />
    );
  }

  createTable() {
    let table = [];
    let tbody = [];
    for (let l = 0; l < 3; l++) {
      let tr = [];
      for (let k = 0; k < 3; k++) {
        let td = [];
        let div = [];
        for (let j = 0; j < 3; j++) {
          let div_board = [];
          for (let i = 0; i < 3; i++) {
            div_board.push(this.renderSquare(l * 27 + k * 9 + j * 3 + i));
          }
          div.push(
            <div key={j} className="board-row">
              {div_board}
            </div>
          );
        }
        td.push(<div key={k}>{div}</div>);
        tr.push(<td key={k}>{td}</td>);
      }
      tbody.push(<tr key={l}>{tr}</tr>);
    }
    table.push(<tbody key="1">{tbody}</tbody>);
    return table;
  }

  render() {
    return <table>{this.createTable()}</table>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    let squares = [
      9,
      null,
      2,
      null,
      null,
      5,
      null,
      3,
      7,
      null,
      null,
      null,
      7,
      2,
      null,
      8,
      null,
      1,
      null,
      1,
      null,
      null,
      9,
      null,
      null,
      6,
      5,
      1,
      7,
      null,
      null,
      8,
      null,
      null,
      null,
      null,
      null,
      null,
      4,
      9,
      null,
      3,
      null,
      null,
      7,
      6,
      3,
      8,
      null,
      7,
      null,
      null,
      5,
      1,
      null,
      null,
      3,
      null,
      null,
      null,
      2,
      9,
      1,
      null,
      6,
      2,
      null,
      null,
      null,
      5,
      3,
      null,
      null,
      8,
      9,
      1,
      null,
      null,
      7,
      null,
      null
    ];
    this.state = {
      squares: squares
    };
    // this.createGame();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * Math.floor(max)) + min;
  }

  createGame() {
    // let squares = this.state.squares;
    // let places = Array.apply(null, { length: 81 }).map(Function.call, Number);
    // let choices = places.slice().map(i => (i % 9) + 1);
    // let count = 0;
    // while (count < 20) {
    //   let iPlace = this.getRandomInt(0, places.length);
    //   let iChoice = this.getRandomInt(0, choices.length);
    //   // console.log("places:", places);
    //   // console.log("choices:", choices);
    //   // console.log("iPlace:", iPlace);
    //   // console.log("iChoice:", iChoice);
    //   let number = choices[iChoice];
    //   let place = places[iPlace];
    //   // console.log("number:", number);
    //   if (
    //     squares[place] === null &&
    //     !checkSquare(squares, number, place) &&
    //     !checkLine(squares, number, place) &&
    //     !checkRow(squares, number, place)
    //   ) {
    //     // console.log("number:", number);
    //     squares[place] = number;
    //     count++;
    //     places.splice(iPlace, 1);
    //     choices.splice(iChoice, 1);
    //   }
    // }
    this.setState({
      squares: Array(81).fill(null)
    });
  }

  render() {
    return (
      <div className="game">
        <div className="game-menu">
          <div>New Game:</div>
          <div>
            <button onClick={() => this.createGame()}>Easy</button>
          </div>
        </div>
        <div className="game-board">
          <Board squares={this.state.squares} />
        </div>
      </div>
    );
  }
}

function checkSquare(squares, num, place) {
  let nSquare = Math.floor(place / 9);
  let square = squares.filter((i, j) => {
    let l = Math.floor(j / 9);
    if (l === nSquare) {
      return i;
    }
    return null;
  });
  // console.log(num, place);
  // console.log(square);
  return square.includes(num);
}

function checkLine(squares, num, place) {
  let nLine = (Math.floor(place / 3) % 3) + Math.floor(place / 27) * 3;
  let line = squares.filter((i, j) => {
    let l = (Math.floor(j / 3) % 3) + Math.floor(j / 27) * 3;
    if (l === nLine) {
      return i;
    }
    return null;
  });
  // console.log(line);
  return line.includes(num);
}

function checkRow(squares, num, place) {
  let nRow = (place % 3) + (Math.floor(place / 9) % 3) * 3;
  let row = squares.filter((i, j) => {
    let l = (j % 3) + (Math.floor(j / 9) % 3) * 3;
    if (l === nRow) {
      return i;
    }
    return null;
  });
  // console.log(row);
  // console.log(num, place, row, row.includes(num));
  return row.includes(num);
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
