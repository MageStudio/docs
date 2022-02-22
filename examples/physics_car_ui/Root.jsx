import { Component } from 'inferno';
import { GameRunner } from 'mage-engine';


const SpeedIndicator = ({ speed }) => {
    const style = {
        position: 'absolute',
        top: '480px',
        'z-index': '9999999',
        left: '24px',
        'font-size': '4em',
    }
    return (
        <span style={style}>
            { Math.floor(Math.abs(speed)) }
        </span>
    );
};

const ResetButton = ({ onClick }) => {
    const style = {
        'position': 'absolute',
        'z-index': '999999',
        'top': '24px',
        'left': '24px',
        'height': '36px',
        'width': '120px',
        'border': '2px solid black',
        'background': 'transparent',
    }
    return (
        <button style={style} onClick={onClick}>
            reset
        </button>
    );
};

class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
            speed: 0
        };
    }

    componentDidMount() {
        setInterval(() => {
            const level = GameRunner.getCurrentLevel();
            if (level && level.car) {
                const state = level.car.getPhysicsState();
                console.log(state);
                this.setState(state);
            }
        }, 250);
    }

    handleResetButtonClick = () => {
        GameRunner
            .getCurrentLevel()
            .resetCar();
    }

    render() {
        const { speed } = this.state;

        return (
            <>
                <SpeedIndicator speed={speed} />
                <ResetButton onClick={this.handleResetButtonClick} />
            </>
        )
    }
}

export default Root;