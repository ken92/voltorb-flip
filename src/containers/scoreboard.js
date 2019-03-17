import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../reducers/actions';
import ScoreboardDisplay from '../components/scoreboard';

class Scoreboard extends Component {
	render() {
		return (
			<ScoreboardDisplay
				current_level_score={this.props.current_level_score}
				total_score={this.props.total_score}
			/>
		);
	}
}

Scoreboard.propTypes = {
	current_level_score: PropTypes.number.isRequired,
	total_score: PropTypes.number.isRequired
};

Scoreboard.defaultProps = {
	current_level_score: 0,
	total_score: 0
};


function mapStateToProps(state) {
	return {
		current_level_score: state.game.current_level_score,
		total_score: state.game.total_score
	};
}

export default connect(mapStateToProps, actions)(Scoreboard);
