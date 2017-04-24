import React from 'react';

import getDemoData from './getDemoData';

let lineColors = ['#3498db','#e74c3c','#1abc9c','#f1c40f','#9b59b6','#2ecc71'];

class GraphController extends React.Component {
	constructor(props) {
		super(props);
		this.refreshGraph = this.refreshGraph.bind(this);
		this.changeLineAmount = this.changeLineAmount.bind(this);
		this.changePointAmount = this.changePointAmount.bind(this);
	}
	refreshGraph() {
		let lines = this.props.lines.map((l, i) => {
			return getDemoData(i, l.points.length, 0, 24, 0, 5);
		});
		this.props.updateGraph({lines});
	}
	changeLineAmount(add) {
		let lines = add ? [...this.props.lines, getDemoData(this.props.lines.length, 2, 0, 24, 0, 5)] : this.props.lines.slice(0, -1);
		this.props.updateGraph({lines});
	}
	changePointAmount(line, add) {
		let lines = this.props.lines.map((l, i) => {
			if (line !== i) return l;
			let arrLength = l.points.length + add;
			return getDemoData(i, arrLength < 2 ? 2 : arrLength, 0, 24, 0, 5);
		});
		this.props.updateGraph({lines});
	}
	componentDidMount() {
		document.querySelector('html').addEventListener('keydown', (e) => {
			if (e.which === 13) {
				this.refreshGraph();
			}
		})
	}
	render() {
		return (
			<div className="graph-controller">
				<button
					className="refresh"
					onClick={this.refreshGraph}
				>refresh graph!</button>
				<div className="split-50">
					<div>
						<h3>Lines</h3>
						<div className="lines">
							<div className="total">
								<h5>{this.props.lines.length}<br/>Total<br/>Lines</h5>
								<div>
									<button
										onClick={() => this.changeLineAmount(true)}
									>
										+
									</button>
									<button
										onClick={() => this.changeLineAmount(false)}
									>
										-
									</button>
								</div>
							</div>
							<div className="points">
								{this.props.lines.map((line, i) => (
									<div key={i}>
										<h6 style={{color: lineColors[i%lineColors.length]}}>{line.points.length} points</h6>
										<div>
											<button
												onClick={() => this.changePointAmount(i, 1)}
											>
												+
											</button>
											<button
												onClick={() => this.changePointAmount(i, -1)}
											>
												-
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div>
						<h3>Axis Labels <span>(a number or labels separated by ", ")</span></h3>
						<div className="x-labels">
							<label>
								<h5>X-Axis</h5>
								<input
									placeholder="separate by ', '"
									value={typeof this.props.xLabels === 'number' ? this.props.xLabels : this.props.xLabels.join(', ')}
									onChange={(e) => {
										e.preventDefault();
										let xLabels = e.target.value.split(', ');
										let num = parseInt(xLabels);
										if (num) {
											xLabels = num;
										}
										this.props.updateGraph({xLabels});
									}}
								/>
							</label>
						</div>
						<div className="y-labels">
							<label>
								<h5>Y-Axis</h5>
								<input
									placeholder="separate by ', '"
									value={typeof this.props.yLabels === 'number' ? this.props.yLabels : this.props.yLabels.join(', ')}
									onChange={(e) => {
										e.preventDefault();
										let yLabels = e.target.value.split(', ');
										let num = parseInt(yLabels);
										if (num) {
											yLabels = num;
										}
										this.props.updateGraph({yLabels});
									}}
								/>
							</label>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default GraphController;