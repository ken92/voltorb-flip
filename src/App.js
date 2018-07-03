import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import StartPage from './containers/startPage';
import GameScreen from './containers/gameScreen';
import actions from './reducers/actions';

class App extends Component {
  render() {
    return this.props.show_start_screen? <StartPage /> : <GameScreen />;
  }
}

App.propTypes = {
  show_start_screen: PropTypes.bool.isRequired
};

App.defaultProps = {
  show_start_screen: false
};


function mapStateToProps(state) {
  return {
    show_start_screen: state.game.show_start_screen
  };
}

export default connect(mapStateToProps, actions)(App);
