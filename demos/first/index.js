import React from 'react';
import { render } from 'react-dom';

import LineGraph from '../../src/scripts/LineGraph';
import GraphController from './GraphController';
import getDemoData from './getDemoData';

import mainStyles from '../../src/styles/main.scss';
import demoStyles from '../../src/styles/demo1.scss';

let xMin = 0;
let xMax = 24;
let yMin = 0;
let yMax = 5;
let lineColors = ['#3498db','#e74c3c','#1abc9c','#f1c40f','#9b59b6','#2ecc71'];

class App extends React.Component {
	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
		this.state = {
			lines: [4, 6, 2].map((n, i) => getDemoData(i, n, xMin, xMax, yMin, yMax)),
			xLabels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
			yLabels: ['lame', 'meh', 'alright', 'nice', 'sweet', 'whaaaa']
		};
	}
	update(data) {
		this.setState((prevState) => ({...prevState, ...data}));
	}
	render() {
		return (
			<div className="graph-container">
				<h1>Line Graph Demo</h1>
				<p>Adjust the number of lines, number of points for each line, and X and Y axis labels. Points are positioned at random. You can refresh the graph via the button below or by pressing the r key.</p>
				<GraphController
					updateGraph={this.update}
					lines={this.state.lines}
					xLabels={this.state.xLabels}
					yLabels={this.state.yLabels}
				/>
				<LineGraph
					lines={this.state.lines}
					width={1.8}
					xLabels={this.state.xLabels}
					yLabels={this.state.yLabels}
					colors={lineColors}
					{...{xMin, xMax, yMin, yMax}}
				/>
			</div>
		);
	}
}

render(
	<App/>,
	document.getElementById('graphEl')
);