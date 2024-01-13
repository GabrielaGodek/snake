import React, { Component } from 'react'

export default class GameOver extends Component {

    setScore() {
        const { score, nickname } = this.props
        console.log(score)
        const existingPlayerData = JSON.parse(localStorage.getItem('player')) || {}
        const updatedPlayerData = {
            ...existingPlayerData,
            [nickname]: score
        }
        localStorage.setItem('player', JSON.stringify(updatedPlayerData));
    }
    componentDidMount() {
        this.setScore()
    }
    restart() {
        window.location.reload()
    }
    render() {
        return (
            <div className='text-center'>
                <h2 className='text-4xl font-extrabold text-black'>Game Over</h2>
                <button className='uppercase bg-snake hover:bg-white hover:text-snake text-white font-normal py-2 px-4  rounded mt-10'
                    onClick={this.restart}>Restart</button>
            </div>
        )
    }
}