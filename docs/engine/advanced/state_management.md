# State Management

Mage uses [Redux](https://redux.js.org/) to handle its **global internal** state. Redux is a powerful tool to handle the state of your application, and it can be easily integrated with your UI. The purpose of this documentation is not to explain how Redux works, but to explain how you can use it within your application.

## Creating the store

In order to create the store, you need to accomplish two things:
- Define and create your reducers
- Define the initial state of your application.

::: warning
It's important that you create the store before starting your Router.
:::

After that, you can simply call the `createStore` method from the `Store` module like so:

```javascript
import { store } from 'mage-engine';
import reducers from './reducers';

const initialState = {
    player: {
        alive: true,
        health: 100
    }
};

const debug = true;

store.createStore(reducers, initialState, debug);
```

After doing this, your store will be available to your UI and to your levels.

Mage uses the store to dispatch common actions. We recommend you to not override the following entries of the state:
```javascript
{
    info: { mage: 3.5.0 },
    input: {
        keyboard: true|false,
        mouse: true|false,
        gamepad: true|false,
        gamepads: {}
    },
    network: {
        isOnline: true|false
    },
    ui: {
        loadingScreenVisible: true|false
    }
}
```

## Reducers

Since you're using the store, it's safe to assume you will be using reducers inside your application. The purpose of this page is not to explain how to create a reducer, but only how to integrate them in Mage.

#### /reducers/player.js

First thing you need to do is to define a reducer. For example, a `player` reducer function.
```javascript

export default (state, action) => {
    if (action.type === 'dead') {
        return {
            ...state,
            dead: true
        };
    }

    return state;
}
```

#### /reducers/index.js

Once the reducer is ready, you need to export it. This specific file structure is not necessary, the only thing that matters is how Mage will receive your reducers, since they must be sent as an object.

```javascript
import player from './player';

export {
    player
};
```

#### /index.js

Now it's the time when you integrate your reducers into Mage. You just need to call the `createStore` method on the `store` module, passing it the `reducers` object exported before. In this scenario, Mage will receive this:

```javascript
{
    player: (state, action) => { ... }
}
```

Now here is how you pass it to the function:

```javascript
import { store } from 'mage-engine';
import reducers from './reducers';

// somewhere
const debug = true;
store.createStore(reducers, {}, debug);
```

This is everything you need to know in order to have working reducers in your application.

::: warning
Mage will internally combine all your reducers with its internal reducers when you call `.createStore`.
:::

## Actions

You can decide to dispatch actions from either your UI or your levels/scripts (or any other module).

::: tip
How to dispatch actions from your UI is explained below.
:::
:::



If you want to dispatch actions from within your levels/scripts, you can do that by calling the `.dispatch(action)` method on the store `store` module.

::: tip
The usage of this method is explained below.
:::
:::



## Methods

The Store module exposes a set of useful methods when being used inside your levels.

#### createStore(reducers: object, initialState: object, debug?: boolean)

As explained above, this method will create the store.

- `reducers: object`: Your reducers object, its meaning is explained above in the `reducers` section.
- `initialState: object`: This represents the initial state of your application.
- `debug?: boolean` (default: `false`): This flag is used to turn on the debug mode. During development, if you're using the Redux dev tools, having this flat set to `true` will help you debugging your issues.

::: tip
For more information on how to install the Redux dev tools, please refer to their official documentation [here](https://redux.js.org/).
:::
:::



#### getState(): object

This method will return the current state of the store.

#### dispatch(action: object)

The dispatch method is used to dispatch actions from your level. It can be used like this

```javascript
import { store } from 'mage-engine'
// inside your level
onCreate() {
    store.dispatch({ type: 'LOADED' });
}
```
::: tip
Mage is using the `redux-thunk` middleware, which allows you to dispatch more sophisticated actions and delay the dispatch of other actions based on conditions. For more information, please refer to their official documentation [here](https://github.com/reduxjs/redux-thunk).
:::
:::



---

## Connecting your UI

In order to connect your components to the store, you need to use the `connect` method exported by Mage. Its syntax is the same as the `connect` function you might be familiar with if you're coming from a React environment.

Here is an example usage of a RootComponent using both `mapStateToProps` and `mapDispatchToProps`:

```javascript
import { connect } from 'mage-engine';
import { saveGame } from './actions';
import LoadingScreen from './loadingscreen';
import UI from './ui';

const RootComponent = ({ loadingScreenVisible, playerHealth, saveGame }) => (
    loadingScreenVisible ?
        <LoadingScreen/> :
        <UI
            onGameSave={saveGame}
            playerHealth={playerHealth}/>
);

const mapStateToProps = ({ ui, player }) => {
    return {
        loadingScreenVisible: ui.loadingScreenVisible,
        playerHealth: player.health
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveGame: () => dispatch(saveGame())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);
```

This code is pretty self-explanatory, and it's very similar to the well-known syntax of `react-redux`, as explained [here](https://react-redux.js.org/introduction/quick-start#connect).

## Connecting your Level

In order to connect your level to the store, there are no extra steps required. Every time the state changes due to a dispatched action, a lifecycle method will be called on your level, `.onStateChange`. This method is explained in the Level page [here](/engine/advanced/core/level.md?id=lifecycle-methods).

You can always get the current state by invoking the `getState()` function of the `store` module.

::: warning
It's currently not possible to hook your scripts to state changes, so you will need to manually get the current state of the store by invoking the `getState()` method.
:::
