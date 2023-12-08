import React, { Component } from 'react'

export default class Footer extends Component {

    render() {
        return (
            <h2 className='text-4xl font-extrabold text-black text-center'>Score: <span className="text-snake dark:text-snake">{this.props.score}</span></h2>
        )
    }
}