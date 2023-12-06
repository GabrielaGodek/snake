import React from 'react'
import { boardConfig, ids } from './Config'

// const { rows, cols, cell } = boardConfig

function Cells({ board, handleKey }) {
    const boardCells = []

    for (let row = 0; row < boardConfig.rows; row++) {
        for (let col = 0; col < boardConfig.cols; col++) {
            const uniqueKey = `${row}-${col}`
            const value = board[boardConfig.cols * row + col]
            const classType = value === ids.body ? 'bg-snake' : (value === ids.food ? 'bg-food' : '')
            boardCells.push(
                <div key={uniqueKey}
                    tabIndex={0}
                    onKeyDown={handleKey}
                    className={classType + ' cell'}
                    style={{ width: boardConfig.cell, height: boardConfig.cell }}
                />)
        }

    }

    return (
        <div
            style={{ width: boardConfig.cols * boardConfig.cell, height: boardConfig.rows * boardConfig.cell }}
            className='flex m-auto flex-wrap bg-background'>{boardCells}</div>
    )
}

export default Cells
