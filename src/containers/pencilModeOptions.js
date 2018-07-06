import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../reducers/actions';
import PencilModeOptionsDisplay from '../components/pencilModeOptions';
import * as vars from '../vars';

class PencilModeOptions extends Component {
	giveUp = () => {
		this.props.flipAllTiles();
	}

	// #### pencil mode button functions ####
	voltorbClick = () => {
		this.props.pencilModeOn(vars.VOLTORB);
	}
	oneClick = () => {
		this.props.pencilModeOn(vars.ONE);
	}
	twoClick = () => {
		this.props.pencilModeOn(vars.TWO);
	}
	threeClick = () => {
		this.props.pencilModeOn(vars.THREE);
	}
	fourClick = () => {
		this.props.pencilModeOn(vars.FOUR);
	}

	render() {
		return (
			<PencilModeOptionsDisplay
				voltorbClick={this.voltorbClick}
				oneClick={this.oneClick}
				twoClick={this.twoClick}
				threeClick={this.threeClick}
				fourClick={this.fourClick}
			/>
		);
	}
}

PencilModeOptions.propTypes = {
	pencilModeOn: PropTypes.func.isRequired
};

PencilModeOptions.defaultProps = {};


function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, actions)(PencilModeOptions);
