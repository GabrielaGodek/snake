import React, { Component } from 'react'
import { boardConfig } from './Config'
export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLegendExpanded: false
        };

        this.toggleLegend = this.toggleLegend.bind(this);
    }

    toggleLegend() {
        this.setState((prevState) => ({
            isLegendExpanded: !prevState.isLegendExpanded
        }));
    }

    render() {
        const { isLegendExpanded } = this.state;
        return (
            <header className="">
                <h1 className='absolute top-0 left-[50%] translate-x-[-50%] my-8 text-4xl font-extrabold leading-none text-black md:text-5xl lg:text-6xl text-center'>SNAKE</h1>
                <nav className='absolute top-10 right-10'>
                    <h2 className={`text-2xl font-extrabold leading-none cursor-pointer relative ${isLegendExpanded ? 'expanded' : ''}`} onClick={this.toggleLegend}>
                        <img src="click.gif" alt="click here to see a legend"  width='40px' className='absolute -right-6 -bottom-6'/>Legend
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
                </nav>
            </header>
        )
    }
}

