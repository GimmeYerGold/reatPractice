// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

import DOM from 'react-dom'
import React, {Component} from 'react'

function app() {
    // start app
    // new Router()

    var bogValues = {   
	body : false,
    dug : false,       
} 

var AppView = React.createClass({
	render: function(){
		return (
			<div className="gameContainer">
			<h1 className="headline">
				BOG BODIES</h1>
				<GridGenerator />		
		</div>	
	)
	}
})

// var dig = React.createClass({
// 	getInitalState: function(){
// 		return {liked: false};
// 	},
// 	handleClick: function(event) {
// 		this.setState({})
// 	},
// 	}
// })

var GridGenerator = React.createClass({
	_getBogDimensions: function(){
		var grid = []
		var sideLength  = 4
		for (var i = 0; i < sideLength; i ++){

			

			var newRow =<Row nickname="what"/>

		    var newPoint = <Point data={bogValues} />

		 	grid.push([newRow])
		 	
		    var row = grid[i]  
	    	for (var j = 0; j < sideLength; j ++){	
	    	// {this._buryRandom(newPoint)} 	
	     		row.push(newPoint)
			}
		}
		console.log(newPoint)
		console.log(grid)
		return grid
	},

	_buryRandom: function(point){
    var chance = Math.random()    	
    if (chance > .36) {
        point.props.data.body = true;
    	}
        else point.props.data.body = false;    
    	},

	render: function(){
		return (
			<div className="bogContainer">
			{this._getBogDimensions()}
			</div>

		)
	}
})	

var Row = React.createClass({
	render: function(){
		return (
			<div className="rowLine">
			</div>
			)
	}
})

var Point = React.createClass({
	render: function(){

		console.log(this)
		return (
			<div className="bogPoint">
			{this.props.bogData}
			</div>
			)
	}	

})

    DOM.render(<AppView/>, document.querySelector('.container'))
}

app()
