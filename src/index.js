import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class HeatsinkContainerList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			containers: []
		}
	}
	
	addHeatsink = () => {
		let containers = this.state.containers.slice()
		containers.push({id: containers.length?containers[containers.length - 1].id + 1:0})
		this.setState({
			containers: containers
		})
	}
	
	deleteHeatsink = (id) => {
		let containers = this.state.containers.slice()
		containers.splice(containers.findIndex((element) => {
			return element.id === id
		}), 1)
		this.setState({
			containers: containers
		})
	}
	
	render() {
		return (
			<div>
				<h1>Heatsinks</h1>
				<button onClick={this.addHeatsink}>Add new heatsink</button>
				{
					this.state.containers.map((item) => (
						<HeatsinkContainer
							id={item.id}
							key={item.id}
							radius={2}
							deleteHeatsink={this.deleteHeatsink}
						/>
					))
				}
			</div>
		)
	}
}

class HeatsinkContainer extends React.Component {
	constructor(props) {
		super(props)
		let diameter = props.radius * 2 + 1
		let population = diameter * diameter
		let shapeInfo = []
		for (let i=0; i<population; i++) {
			shapeInfo.push({
				id: i,
				material: 0
			})
		}
		this.state = {
			shapeInfo: shapeInfo
		}
	}
	
	render() {
		let diameter = this.props.radius * 2 + 1
		let rows = []
		for (let i=0; i<diameter; i++) {
			rows.push({
				row: this.state.shapeInfo.slice(i * diameter, (i+1) * diameter),
				id: i
			})
		}
		return (
			<div>
				<h2>A heatsink container</h2>
				<p>id: {this.props.id}</p>
				<HeatsinkShapeGrid
					rows={rows}
				/>
				<button onClick={
					() => {this.props.deleteHeatsink(this.props.id)}
				}>Delete</button>
			</div>
		)
	}
}

class HeatsinkShapeGrid extends React.Component {
	constructor(props) {
		super(props)		
	}
	
	render() {
		return (
			<div>
				{
					this.props.rows.map((item) => (
						<HeatsinkShapeRow
							id={item.id}
							key={item.id}
							cells={item.row}
						/>
					))
				}
			</div>
		)
	}
}

class HeatsinkShapeRow extends React.Component {
	constructor(props) {
		super(props)		
	}
	
	render() {
		return (
			<div>
				{
					this.props.cells.map((item) => (
						<HeatsinkShapeCell
							id={item.id}
							key={item.id}
							material={item.material}
						/>
					))
				}
			</div>
		)
	}
}

class HeatsinkShapeCell extends React.Component {
	constructor(props) {
		super(props)		
	}
	
	render() {
		return (
			<button>{this.props.material}</button>
		)
	}
}

// ========================================

ReactDOM.render(
  <HeatsinkContainerList />,
  document.getElementById('root')
);

