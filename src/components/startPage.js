import React from 'react';
import PropTypes from 'prop-types';

const StartPage = (props) => {
	return (
		<div className="container innerContainer">
			<h2>Voltorb Flip</h2>
			<h4>It's like Minesweeper, but different</h4>

			<div className="row">
				<div className="col-xs-12 col-md-6">
					<label htmlFor="row">
						# Rows:
					</label>
					{props.rowsInput}
				</div>
				<div className="col-xs-12 col-md-6">
					<label htmlFor="col">
						# Columns:
					</label>
					{props.colsInput}
				</div>
			</div>
			<div className="row">
				<button className="btn btn-primary col-xs-12" style={{marginTop: '10px'}} onClick={props.startButtonClick}>Start!</button>
			</div>
		</div>
	);
}

StartPage.propTypes = {
	rowsInput: PropTypes.element.isRequired,
	colsInput: PropTypes.element.isRequired,
	startButtonClick: PropTypes.func.isRequired
};

StartPage.defaultProps = {};

export default StartPage;
