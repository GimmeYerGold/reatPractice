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

    var textColorChange = "#FF"  

    var randInRange = function(lower,upper) {
    var diff = upper - lower
    var result = lower + Math.round(diff * Math.random())
    return result
}

    var bogValues = function(i,j){
	    this.image = "http://robbieandbobby.com/wp-content/uploads/2016/03/bogbody.png"
	    this.coords = "[" + i + "," + j + "]"
	    if (Math.random() > .76) {
    		this.body = true;
		} 
		else { 
			this.body = false; 
		}
	}

	var archives = {
		day: 0,
		bodyCount: 0,
		phrase:  {
			end: {
				1: "The time for digging is over.",
				2: "It's quittin' time!",
				3: "You sink into the bog, never to be seen again.",
				4: "That'll do pig, that'll do."
			},
			already: {
				1: "You already dug here.",
				2: "No use digging here again.",
				3: "Better luck elsewhere...",
				4: "You can't dig any deeper...",
				5: "Even your blisters have blisters.",
				6: "Is this how you wanted to spend your weekend?",
				7: "You're a glutton for punishment.",
				8: "Why not try over THERE?"	
			},	
			found: "YOU FOUND A BODY!",
			nothing: {

				1: "You find nothing.",
				2: "Still nothing. The pub is calling...",
				3: "Just more peat...",
				4: "Here be dragons! Just kidding, only more peat.",
				5: "Nothing. If you continue at this rate, YOU may be the next body in the bog.",
				6: "This search produced nothing but sweat and tears.",
				7: "This is so #Toilcore...",
				8: "Mud bubbles up from the bog...",
				9: "Welcome to the Bog of Eternal Stench.",
				10: "A bog body is a human cadaver that has been naturally mummified in a peat bog.",
				11: "Unlike most ancient human remains, bog bodies have retained their skin and internal organs.",
				12: "The oldest known bog body is the skeleton of Koelbjerg Woman, who lived in Denmark during the Mesolithic period.",
				13: "Iron Age bog bodies typically illustrate a number of similarities, such as violent deaths and a lack of clothing.",
				14: "Scientists identified the Tollund Man's last meal as porridge or gruel made from grains and seeds.",
				15: "'Bog butter' refers to an ancient waxy substance found buried in peat bogs.",
				16: "Bog butter is found buried inside some sort of wooden container, such as buckets, kegs, or barrels.",
				17: "The practice of burying butter could have arisen as a strategy for protecting food from thieves.",
				18: "The bog acids, with pH levels similar to vinegar, conserve the human bodies in the same way as fruit is preserved by pickling.",
				19: "Many bog bodies show signs of being stabbed, bludgeoned, hanged or strangled.",
				20: "Some bog bodies show signs of torture, such as Old Croghan Man, who had deep cuts beneath his nipples.",
				21: "A number of skeletons found in Florida have been called 'bog people'.",
				22: "Ever since the Iron Age, humans have used bogs to harvest peat, a common fuel source.",
				23: " The original motivations behind the creation of bog butter are unclear.",
				24: "A shovel is your best friend.",
				25: "Haven't you had enough digging?",
				26: "To learn more about bog bodies, keep digging!",
				27: "You've seen enough peat for a hundred lifetimes...",
				28: "One more try, then we head for the pub.",
			
				},
			bodyDesc: {
				1: "Hot Bodies!",
				2: "Gross!!", 
				3: "Sick...", 
				4: "Yuckers!",
				5: "Spooky...",
				6: "Grandpa?",
				}
		}
	}	

var AppView = React.createClass({
	render: function(){
		return (
			<div className="gameContainer">
			<h1 className="headline">
				BOG BODIES</h1>
				<BogGenerator />		
			</div>	
	)
	}
})

var BogGenerator = React.createClass({
	_getBogDimensions: function(){
		var grid = []
		var sideLength  = 10
		for (var i = 0; i < sideLength; i ++){
		 	var newPoints = []
	    	for (var j = 0; j < sideLength; j ++){
        		var newPoint = <Point data={new bogValues(i,j)} />
	     		newPoints.push(newPoint)	    
			}

		var newRow = <Row points={newPoints} key={i}/>
		grid.push(newRow)
		}
		return grid
	},

	render: function(){
		return (
			<div className="bogContainer">
			{this._getBogDimensions()}
			<History data={archives}/>
			</div>
		)
	}
})	

var Row = React.createClass({
	render: function(){
		return (
			<div className="rowLine">
			{this.props.points}
			</div>
			)
	}
})

var Point = React.createClass({
	
	_handleClick: function(clickEvent){

		var days = document.querySelector('.dayCount')
		var phrase = document.querySelector('.phraseBox')
		var bodyCounts = document.querySelector('.bodyCount')

		if(archives.day > 13) {
			archives.day+=0
			phrase.textContent += " " + archives.phrase.end[randInRange(1,8)]	
			return
		}

		if(this.state.bodyfound) {
			archives.day+=0
			phrase.textContent += " " + archives.phrase.already[randInRange(1,8)]
			return
		}

		if (this.state.dug)  {
			archives.day+=0
			phrase.style.color = textColorChange + 5722 * archives.day
			phrase.textContent += " " + archives.phrase.already[randInRange(1,8)]
			return
		}
		if (this.props.data.body){

			this.setState({
				dug: true,
				digSymbol: "o",
				bodyfound: true
			})
			archives.day+=1
			archives.bodyCount+=1
			phrase.textContent += " " + archives.phrase.found + " " + archives.phrase.bodyDesc[randInRange(1,6)]  
			days.textContent = "Day: " + archives.day +"/14"
			bodyCounts.textContent = "Bodies: " + archives.bodyCount
			return
		}
		else {
			this.setState({
				dug: true,
				digSymbol: "o",
				bodyfound: false
			})
			archives.day+=1
			phrase.textContent += " " + archives.phrase.nothing[randInRange(1,28)]
			days.textContent = "Day: " + archives.day +"/14"
			return
		}
		},	

	getInitialState: function(){
			return {
				dug: false,
				digSymbol: "~",
				bodyfound: false
		}
	},
	render: function(){
		if(this.props.data.body){
			return (
			<div onClick={this._handleClick} className="bogPoint"><img src={this.props.data.image}/></div>
		)
		} else {	
		
		return (
			<div onClick={this._handleClick} className="bogPoint"></div>
		)
	}
	}		
})

var History = React.createClass({

	render: function(){
		return (
			<div className="historyContainer">
			<p className="dayCount">Day: {archives.day}/14</p>
			<p className="bodyCount">Bodies: {this.props.data.bodyCount}</p>
			<div className= "phraseBox">
			<p> You have a fortnight to find as many bog bodies as you can...FOR SCIENCE!</p>
			</div>
			</div>
		)
	}
})

    DOM.render(<AppView />, document.querySelector('.container'))
}

app()