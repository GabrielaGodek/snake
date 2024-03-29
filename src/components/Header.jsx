import React, { Component } from 'react'
import { boardConfig } from './Config'
export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLegendExpanded: false,
            isScoreTableExpanded: false,
            playerScores: {}
        };

        this.toggleLegend = this.toggleLegend.bind(this);
        this.toggleScoreTable = this.toggleScoreTable.bind(this);
    }

    toggleLegend() {
        this.setState((prevState) => ({
            isLegendExpanded: !prevState.isLegendExpanded,
        }));
    }
    toggleScoreTable() {
        this.setState((prevState) => ({
            isScoreTableExpanded: !prevState.isScoreTableExpanded
        }));
        this.getLocalScores()
    }
    getLocalScores() {
        let scores = JSON.parse(localStorage.getItem('player')) || {}
        this.setState({
            playerScores: scores
        })
    }

    render() {
        const { isLegendExpanded, isScoreTableExpanded, playerScores } = this.state;
        return (
            <header className="">
                <h1 className='absolute top-0 left-[50%] translate-x-[-50%] my-8 text-4xl font-extrabold leading-none text-black md:text-5xl lg:text-6xl text-center'>SNAKE</h1>
                <nav className='absolute top-10 right-10 w-40'>
                    <h2
                        className={`text-2xl font-extrabold leading-none cursor-pointer relative ${isLegendExpanded ? 'expanded' : ''}`}
                        onClick={this.toggleLegend}
                    >
                        Legend
                    </h2>
                    {isLegendExpanded && (
                        <ul>
                            <li className='flex items-center gap-2'>
                                <span className='bg-snake flex-shrink-0' style={{ width: boardConfig.cell, height: boardConfig.cell }}></span>
                                Snake
                            </li>
                            <li className='flex gap-2 items-center'>
                                <span className='bg-food flex-shrink-0' style={{ width: boardConfig.cell, height: boardConfig.cell, display: 'block' }}></span>
                                Food
                            </li>
                            <li className='flex gap-2 items-center'>
                                <span className='bg-bomb flex-shrink-0' style={{ width: boardConfig.cell, height: boardConfig.cell, display: 'block' }}></span>
                                Bomb
                            </li>
                        </ul>
                    )}

                    <h2 className={`text-2xl font-extrabold leading-none cursor-pointer relative ${isScoreTableExpanded ? 'expanded' : ''}`} onClick={this.toggleScoreTable}>Score table
                    </h2>
                    {isScoreTableExpanded && (
                        <ul>
                            {Object.keys(playerScores).length > 0 ? (
                                Object.entries(playerScores)
                                    .sort(([, valueA], [, valueB]) => valueB - valueA)
                                    .map(([key, value], i) => (
                                        <li key={key}>
                                            <b>{i + 1}</b>.&nbsp;{key}:&nbsp;{value}
                                        </li>
                                    ))
                            ) : (
                                <li>No scores available.</li>
                            )}
                        </ul>
                    )}
                </nav>
            </header>
        )
    }
}

