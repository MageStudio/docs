import { createVNode, Fragment, Component } from 'inferno';
import { GameRunner } from 'mage-engine';

window.gm = GameRunner;

const SpeedIndicator = ({ speed }) => {
    return (
        <span>
            { speed }
        </span>
    );
};

const ResetButton = ({ onClick }) => {
    return (
        <button onClick={onClick}>
            reset
        </button>
    );
};

export default class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
            speed: 0
        };
    }

    componentDidMount() {
        const level = GameRunner.getCurrentLevel();
        // setInterval(() => {
        //     if (level && level.car) {
        //         const { speed } = level.car.getPhysicsState();
        //         this.setState({ speed });
        //     }
        // }, 250);
    }

    handleResetButtonClick = () => {
        GameRunner.getCurrentLevel().resetCar();
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