# User Interface

This guide will give you a short introduction to UI. Mage engine uses `inferno` for its components and `redux` for state management.

!> This guide is assuming you have basic knowledge of how React-like UI frameworks work, so it's not going into details when it comes to the inner workings of the framework.

?>  The topic is quite extensive, and it's fully covered in its dedicated page. For more information about state management, head over [here](/engine/advanced/state_management.md). If you need a deeper introduction to UI, please refer to [this page](/engine/advanced/ui.md).

For this guide, we're going to introduce two simple components, one called `SpeedIndicator` and another one called `ResetButton`.
First, let's create the `SpeedIndicator` component.

### SpeedIndicator.js

```js
const SpeedIndicator = ({ speed }) => {
    return (
        <span>
            { speed }
        </span>
    );
};

export default SpeedIndicator
```

Pretty self explanatory, this will render a component that contains a `span` displaying the current speed of the car.

### ResetButton.js

```js
const ResetButton = ({ onClick }) => {
    return (
        <button onClick={onClick}>
            reset
        </button>
    );
};

export default ResetButton;
```

This one is quite easy as well. It will display a button on screen: its purpose is to reset the car to its initial position if you fall off the edge.

### Root.js

Let's now create a root component that will take care of both child components.

```js
import { Component, GameRunner } from 'inferno';

class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
            speed: 0
        };
    }

    componentDidMount() {
        const level = GameRunner.getCurrentLevel();
        setInterval(() => {
            if (level.car) {
                const { speed } = level.car.getPhysicsState();
                this.setState({ speed });
            }
        }, 250);
    }

    handleResetButtonClick = () => {
        GameRunner.getCurrentLevel().resetCar();
    }

    render() {
        const { speed } = this.state;

        return (
            <>
                <SpeedIndicator speed={speed}>
                <ResetButton onClick={this.handleResetButtonClick}>
            </>
        )
    }
}
```

What is happening in `Root.js`:
- We set up a timer, every `250ms` we're going to get the current running level, get the car instance and extract its speed.
  - `GameRunner.getCurrentLevel()`: belongs to the `GameRunner` module, which is responsible for running your levels. This method will return the instance of the level that is currently playing.
  - `car.getPhysicsState()` will return the current physic state for the object.

?> More information on `GameRunner` is available on its dedicated page [here](/engine/advanced/gamerunner.md). The same applies for the `Element` [page](/engine/advanced/core/element.md), where `getPhysicsState` is explained.

## Enabling UI

Enabling UI is pretty straightforward. Just head over your configuration object, and add the following:

```js
import Root from './path/to/Root.js';

const config = {
    // previous config
    ui: {
        root: Root
    }
}
```

?> Again, configuration has its dedicated page [here](/engine/advanced/configuration.md).