import React, { Component } from 'react'
import Cells from './Cells'
import { boardConfig, start, ids, keys, dirs } from './Config'


export default class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            board: [],
            snake: [],
            direction: null,
            gameOver: false
        }

        // this.nextDirection = null

        this.start = this.start.bind(this)
        this.frame = this.frame.bind(this)
        this.handleKey = this.handleKey.bind(this)
        // this.frame = () => this.frame();
        // this.start = () => this.start();
        // this.handleKey = () => this.handleKey();
    }

    componentDidMount() {
        this.start()
    }
    start() {
        const board = []
        const snake = [start]
        board[start] = ids.body

        this.setState({
            board,
            snake,
            direction: keys.right
        }, () => {
            this.frame()
        })
    }

    frame() {
        let { snake, board, direction } = this.state

        const head = this.getNextIndex(snake[0], direction)
        const food = board[head] === ids.food || snake.length === 1

        if (snake.indexOf(head) !== -1) {
            this.setState({ gameOver: true })
        }
        if (food) {
            const maxCells = boardConfig.rows * boardConfig.cols
            let i
            do {
                i = Math.floor(Math.random() * maxCells)
            } while (board[i])

            board[i] = ids.food
        } else {
            board[snake.pop()] = null
        }

        board[head] = ids.body
        snake.unshift(head)


        if (this.nextDirection) {
            direction = this.nextDirection
            this.nextDirection = null
        }

        this.setState({
            board,
            snake,
            direction
        }, () => {
            setTimeout(() => {
                this.frame()
            }, 300);
        })

    }

    handleKey = (event) => {
        const direction = event.nativeEvent.keyCode

        const diff = Math.abs(this.state.direction - direction)

        if (dirs[direction] && diff !== 0 && diff !== 2) {
            this.nextDirection = direction
            console.log(this.nextDirection)
        }

    }

    getNextIndex(head, direction) {
        let x = head % boardConfig.cols;
        let y = Math.floor(head / boardConfig.cols);

        if (direction === keys.up) {
            y = y <= 0 ? boardConfig.rows - 1 : y - 1;
        } else if (direction === keys.down) {
            y = y >= boardConfig.rows ? 0 : y + 1;
        } else if (direction === keys.left) {
            x = x <= 0 ? boardConfig.cols - 1 : x - 1;
        } else if (direction === keys.right) {
            x = x >= boardConfig.cols - 1 ? 0 : x + 1;
        } else {
            return;
        }

        return (boardConfig.cols * y) + x;
    }

    render() {
        const { board } = this.state
        return (
            <Cells
                handleKey={this.handleKey}
                board={board} />
        )
    }
}