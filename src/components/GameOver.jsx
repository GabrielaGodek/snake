import React, { Component } from 'react'

export default class Footer extends Component {

    restart() {
        window.location.reload()
        console.log('reload')
    }
    render() {
        return (
            <div className='text-center'>
                <h2 className='text-4xl font-extrabold text-black'>Game Over</h2>
                {/* <p className='font-bold text-2xl'>Your score: {this.props.score}</p> */}
                <button className='uppercase bg-snake hover:bg-white hover:text-snake text-white font-normal py-2 px-4  rounded mt-10'
                    onClick={this.restart}>Restart</button>
            </div>
        )
    }
}