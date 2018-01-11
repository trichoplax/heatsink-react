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
		this.state = {
			count: 0
		}
	}

	incrementMe = () => {
		this.setState({
			count: this.state.count + 1
		})
	}
	
	render() {
		return (
			<div>
				<h2>A heatsink container</h2>
				<p>id: {this.props.id}</p>
				<button onClick={this.incrementMe}>{this.state.count}</button>
				<button onClick={() => {this.props.deleteHeatsink(this.props.id)}}>Delete</button>
			</div>
		)
	}
}


// ========================================

ReactDOM.render(
  <HeatsinkContainerList />,
  document.getElementById('root')
);

