import React, { Component } from 'react'
import Cells from './Cells'


export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [],
            snake: [],
            direction: null,
            gameOver: false
        }
    }
    render() {
        return (
            <Cells />
        )
    }
}