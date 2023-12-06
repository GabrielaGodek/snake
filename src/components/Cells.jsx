import React from 'react'
import { boardConfig } from './Config'

// const { rows, cols, cell } = boardConfig

function Cells() {
    const boardCells = []

    for (let row = 0; row < boardConfig.rows; row++) {
        for (let col = 0; col < boardConfig.cols; col++) {
            boardCells.push(<div className={'cell'} style={{width: boardConfig.cell, height: boardConfig.cell}}/>)
        }

    }

    return (
        <div
            style={{ width: boardConfig.cols * boardConfig.cell, height: boardConfig.rows * boardConfig.cell }}
            className='flex m-auto flex-wrap bg-background'>{boardCells}</div>
    )
}

export default Cells
