import React, { Component } from 'react'

export default class Footer extends Component {

    render() {
        return (
            <footer>
                <h2 className='absolute bottom-0 left-[50%] translate-x-[-50%] my-8 text-4xl font-extrabold text-black text-center'>Score: <span className="text-snake dark:text-snake">{this.props.score}</span></h2>
            </footer>
        )
    }
}