import React, { Component } from 'react'
import Cells from './Cells'
import Header from './Header'
import Footer from './Footer'
import GameOver from './GameOver'
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

        this.handleKey = this.handleKey.bind(this)
        this.start = this.start.bind(this)
        this.frame = this.frame.bind(this)
    }

    componentDidMount() {
        this.start()
        document.addEventListener("keydown", this.handleKey)
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKey)
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
        const { snake, board, direction } = this.state

        const head = this.getNextIndex(snake[0], direction)
        const isFoodEaten = board[head] === ids.food || snake.length === 1
        const isBombCollided = board[head] === ids.bomb

        if (snake.includes(head)) {
            this.setState({ gameOver: true })
            return
        }

        if (isBombCollided) {
            return this.setState({ gameOver: true })
        }

        if (isFoodEaten) {
            this.placeFoodOnBoard()
            this.placeBombOnBoard()
        } else {
            const tail = snake.pop()
            board[tail] = null
        }

        board[head] = ids.body
        snake.unshift(head)

        this.setState({ board, snake, direction }, () => {
            const delay = 400 - (snake.length - 1) * 50
            console.log(delay)
            setTimeout(() => {
                this.frame()
            }, Math.max(delay, 50))
        })
    }

    placeFoodOnBoard() {
        const { board } = this.state
        const maxCells = boardConfig.rows * boardConfig.cols
        let foodIndex

        do {
            foodIndex = Math.floor(Math.random() * maxCells)
        } while (board[foodIndex])

        board[foodIndex] = ids.food
    }
    placeBombOnBoard() {
        const { board } = this.state
        const maxCells = boardConfig.rows * boardConfig.cols
        let bombIndex

        do {
            bombIndex = Math.floor(Math.random() * maxCells)
        } while (board[bombIndex])

        board[bombIndex] = ids.bomb
    }


    handleKey = (event) => {
        const nextDirection = event.keyCode

        const isValidDirection = dirs[nextDirection]
        const isDirectionChange = Math.abs(this.state.direction - nextDirection) !== 2

        if (isValidDirection && isDirectionChange) {
            this.setState({ direction: nextDirection })
        }
    }


    getNextIndex(head, direction) {
        const x = head % boardConfig.cols
        const y = Math.floor(head / boardConfig.cols)

        switch (direction) {
            case keys.up:
                return this.calculateNextIndex(x, y - 1, boardConfig.rows)
            case keys.down:
                return this.calculateNextIndex(x, y + 1, boardConfig.rows)
            case keys.left:
                return this.calculateNextIndex(x - 1, y, boardConfig.cols)
            case keys.right:
                return this.calculateNextIndex(x + 1, y, boardConfig.cols)
            default:
                return head
        }
    }

    calculateNextIndex(x, y, limit) {
        if (x < 0) {
            x = limit - 1
        } else if (x >= limit) {
            x = 0
        }

        if (y < 0) {
            y = limit - 1
        } else if (y >= limit) {
            y = 0
        }

        return (limit * y) + x
    }


    render() {
        const { board, snake, gameOver } = this.state
        return (
            <main className="m-10">
                <Header />
                {gameOver ? <GameOver score={snake.length} /> : <Cells
                    handleKey={this.handleKey}
                    board={board} />}

                <footer>
                    <Footer score={snake.length} />
                </footer>
            </main>
        )
    }
}