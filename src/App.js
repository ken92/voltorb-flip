import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import StartPage from './containers/startPage';
import GameScreen from './containers/gameScreen';
import actions from './reducers/actions';
import * as vars from './vars';
import * as util from './util';

class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', event => {
      // if the user hits a pencil mode shortcut, open pencil mode to that function
      const mode = util.getPencilModeFromKey(event.key);
      if (this.props.game_running && mode) {
        if (mode === vars.TOGGLE_PENCIL_MODE || mode === this.props.pencil_mode) {
          if (this.props.pencil_mode)
            this.props.pencilModeOff();
          else
            this.props.pencilModeOn(vars.VOLTORB);
        } else
          this.props.pencilModeOn(mode);
      }
    });
  }

  render() {
    const contents = this.props.show_start_screen? <StartPage /> : <GameScreen />;
    return (
      <div className="outerContainer">
        {contents}
      </div>
    );
  }
}

App.propTypes = {
  show_start_screen: PropTypes.bool.isRequired,
  pencilModeOff: PropTypes.func.isRequired,
  pencilModeOn: PropTypes.func.isRequired,
  pencil_mode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]).isRequired
};

App.defaultProps = {
  show_start_screen: false,
  game_running: false,
  pencil_mode: false
};


function mapStateToProps(state) {
  return {
    show_start_screen: state.game.show_start_screen,
    game_running: state.game.game_running,
    pencil_mode: state.game.pencil_mode
  };
}

export default connect(mapStateToProps, actions)(App);
