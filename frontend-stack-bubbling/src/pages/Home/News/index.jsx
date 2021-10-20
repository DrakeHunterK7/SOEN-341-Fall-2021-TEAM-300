import React, { Component } from 'react'

export default class News extends Component {
	render() {
		const mystyle = {
			margin:"20px"
		};
		return (
			
			<ul style={{mystyle}}>
				<li>news001</li>
				<li>news002</li>
				<li>news003</li>
			</ul>
		)
	}
}
