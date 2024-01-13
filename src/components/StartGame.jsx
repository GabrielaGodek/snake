import React, { Component } from 'react';

export default class StartGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: ''
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(event) {
        const value = event.target.value;
        this.setState({
            nickname: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { setNicknameProvided } = this.props;
        const { nickname } = this.state;

        if (setNicknameProvided) {
            setNicknameProvided(nickname);
        }
    }

    render() {
        return (
            <div>
                <form action="" onSubmit={this.handleSubmit}  className='text-center flex flex-col justify-center items-center'>
                    <label htmlFor='nick' className='text-4xl font-extrabold text-black mb-10'>
                        Provide your nickname:
                    </label>
                    <input
                        type='text'
                        name="nick"
                        className='px-5 py-1 w-full mb-5'
                        placeholder='nickname'
                        value={this.state.nickname}
                        onChange={this.handleInput}
                        onKeyDown={(e) => e.key === 'Enter' && this.handleSubmit(e)}
                    />
                    <button
                        className="bg-snake hover:bg-food w-6/12 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={this.handleSubmit}
                    >
                        Let's play!
                    </button>
                </form>
            </div>
        );
    }
}