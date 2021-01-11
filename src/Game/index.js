import React, { Component } from "react";
import "./index.css";
import Grid from "./Grid";
import Header from "./Header";

import WinningDialog from "./Winningdialog";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openedCells: 0,
      time: 0,
      grid: props.grid,
      columns: props.columns,
      mines: props.mines,
      flags: props.flags,
      game: "pending",
      isWinningDialog: true,
      category: this.getCategory(),
      limit: "",
    };
    this.beginnerLast = "";
    this.intermediateLast = "";
    this.expertLast = "";
    this.escFunction = this.escFunction.bind(this);
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.reset();
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  getCategory = () => {
    if (
      this.props.grid === 9 &&
      this.props.columns === 9 &&
      this.props.mines === 10
    ) {
      return "beginner";
    } else if (
      this.props.grid === 16 &&
      this.props.columns === 16 &&
      this.props.mines === 40
    ) {
      return "intermediate";
    } else if (
      this.props.grid === 16 &&
      this.props.columns === 30 &&
      this.props.mines === 99
    ) {
      return "expert";
    } else {
      return "";
    }
  };

  componentWillMount() {
    this.intervals = [];
  }

  tick = () => {
    if (this.state.openedCells > 0 && this.state.game === "running") {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  };

  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  };

  setLastValues = (beginner, intermediate, expert) => {
    this.beginnerLast = beginner;
    this.intermediateLast = intermediate;
    this.expertLast = expert;
  };

  reset = () => {
    this.newState = {
      openedCells: 0,
      time: 0,
      grid: this.props.grid,
      columns: this.props.columns,
      mines: this.props.mines,
      flags: this.props.flags,
      game: "pending",
      category: this.getCategory(),
    };

    this.intervals.map(clearInterval);

    this.setState({ ...this.newState }, () => {
      this.intervals = [];
    });
    this.setState({ isWinningDialog: false });
  };

  finishGame = () => {
    this.setState({
      game: "ended",
    });
  };

  handleCellInspect = () => {
    if (this.state.game !== "running" && this.state.openedCells === 0) {
      this.setState(
        {
          game: "running",
        },
        () => {
          this.setInterval(this.tick, 1000);
        }
      );
    }

    this.setState((previousState) => {
      return { openedCells: previousState.openedCells + 1 };
    });
  };

  changeFlagsNumber = (amount) => {
    this.setState({ flags: this.state.flags + amount });
  };

  winning = () => {
    var value;
    if (this.state.category === "beginner") {
      value = this.beginnerLast;
    } else if (this.state.category === "intermediate") {
      value = this.intermediateLast;
    } else if (this.state.category === "expert") {
      value = this.expertLast;
    }

    this.setState({
      limit: value,
      game: "won",
      isWinningDialog: true,
    });
  };

  render() {
    var widthstyle = {
      width: this.state.columns * 34 + (this.state.columns >= 8 ? +12 : 9),
    };
    return (
      <div className="minesweeper">
        <div style={widthstyle}>
          <Header
            time={this.state.time}
            flags={this.state.flags}
            reset={this.reset}
            columns={this.state.columns}
          />
        </div>
        <div style={widthstyle}>
          <Grid
            game={this.state.game}
            openedCells={this.state.openedCells}
            grid={this.state.grid}
            columns={this.state.columns}
            mines={this.state.mines}
            changeFlagsNumber={this.changeFlagsNumber}
            onCellInspect={this.handleCellInspect}
            finishGame={this.finishGame}
            winning={this.winning}
          />
        </div>

        <WinningDialog
          category={this.state.category}
          isOpen={this.state.isWinningDialog}
          onClose={(e) => this.setState({ isWinningDialog: false })}
          onNewGame={this.reset}
          time={this.state.time}
          limit={this.state.limit}
        ></WinningDialog>
      </div>
    );
  }
}

export default Game;
