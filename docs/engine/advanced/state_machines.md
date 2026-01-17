# State Machines

Mage integrates [XState](https://xstate.js.org/) to provide powerful state machine capabilities for managing complex entity behaviors.

## Import

```javascript
import { ENTITY_EVENTS } from 'mage-engine';
```

## Entity Methods

All entities (elements, models, etc.) have built-in state machine support:

```javascript
element.hasStateMachine()           // Check if has state machine
element.addStateMachine(config)     // Add XState machine
element.startStateMachine()         // Start the machine
element.stopStateMachine()          // Stop the machine
element.changeState(event)          // Send event to machine
```

## Events

```javascript
ENTITY_EVENTS.STATE_MACHINE.CHANGE  // Fired on state transition
```

---

## Basic Example

```javascript
import { Cube, ENTITY_EVENTS } from 'mage-engine';

class Enemy extends Cube {
    constructor() {
        super(5, 0xff0000);
        
        // Define state machine
        this.addStateMachine({
            id: 'enemyAI',
            initial: 'idle',
            autostart: true,
            states: {
                idle: {
                    on: { PLAYER_SPOTTED: 'chase' }
                },
                chase: {
                    on: { 
                        PLAYER_LOST: 'idle',
                        IN_RANGE: 'attack'
                    }
                },
                attack: {
                    on: { 
                        OUT_OF_RANGE: 'chase',
                        PLAYER_DEAD: 'idle'
                    }
                }
            }
        });
        
        // Listen for state changes
        this.addEventListener(ENTITY_EVENTS.STATE_MACHINE.CHANGE, this.onStateChange.bind(this));
    }
    
    onStateChange({ state }) {
        console.log('New state:', state.value);
        
        switch (state.value) {
            case 'idle':
                this.setColor(0x00ff00);  // Green when idle
                break;
            case 'chase':
                this.setColor(0xffff00);  // Yellow when chasing
                break;
            case 'attack':
                this.setColor(0xff0000);  // Red when attacking
                break;
        }
    }
    
    update(dt) {
        // Check player distance and trigger events
        const distance = this.getDistanceToPlayer();
        
        if (distance < 50) {
            this.changeState('PLAYER_SPOTTED');
        }
        if (distance < 10) {
            this.changeState('IN_RANGE');
        }
        if (distance > 60) {
            this.changeState('PLAYER_LOST');
        }
    }
}
```

---

## Traffic Light Example

```javascript
class TrafficLight extends Box {
    constructor() {
        super(2, 5, 2, 0x333333);
        
        this.addStateMachine({
            id: 'trafficLight',
            initial: 'red',
            autostart: true,
            states: {
                red: {
                    on: { NEXT: 'green' },
                    entry: () => this.setLightColor(0xff0000)
                },
                green: {
                    on: { NEXT: 'yellow' },
                    entry: () => this.setLightColor(0x00ff00)
                },
                yellow: {
                    on: { NEXT: 'red' },
                    entry: () => this.setLightColor(0xffff00)
                }
            }
        });
        
        // Auto-cycle every 3 seconds
        setInterval(() => this.changeState('NEXT'), 3000);
    }
    
    setLightColor(color) {
        this.setColor(color);
    }
}
```

---

## Door State Machine

```javascript
class Door extends Models {
    constructor() {
        super();
        
        this.addStateMachine({
            id: 'door',
            initial: 'closed',
            autostart: true,
            states: {
                closed: {
                    on: {
                        OPEN: 'opening'
                    }
                },
                opening: {
                    on: {
                        OPENED: 'open'
                    },
                    entry: () => this.playOpenAnimation()
                },
                open: {
                    on: {
                        CLOSE: 'closing'
                    }
                },
                closing: {
                    on: {
                        CLOSED: 'closed'
                    },
                    entry: () => this.playCloseAnimation()
                }
            }
        });
    }
    
    playOpenAnimation() {
        this.playAnimation('open');
        setTimeout(() => this.changeState('OPENED'), 1000);
    }
    
    playCloseAnimation() {
        this.playAnimation('close');
        setTimeout(() => this.changeState('CLOSED'), 1000);
    }
    
    interact() {
        // Toggle door
        this.changeState('OPEN');
        // or
        this.changeState('CLOSE');
    }
}
```

---

## Nested States

```javascript
class Character extends Models {
    constructor() {
        super();
        
        this.addStateMachine({
            id: 'character',
            initial: 'alive',
            autostart: true,
            states: {
                alive: {
                    initial: 'idle',
                    states: {
                        idle: {
                            on: { MOVE: 'moving' }
                        },
                        moving: {
                            on: { STOP: 'idle' }
                        }
                    },
                    on: { DAMAGE: 'hurt', KILL: 'dead' }
                },
                hurt: {
                    on: { RECOVER: 'alive' }
                },
                dead: {
                    type: 'final'
                }
            }
        });
    }
}
```

---

## Context and Actions

```javascript
class HealthSystem extends Cube {
    constructor() {
        super(5, 0x00ff00);
        
        this.addStateMachine({
            id: 'health',
            initial: 'healthy',
            context: {
                hp: 100,
                maxHp: 100
            },
            autostart: true,
            states: {
                healthy: {
                    on: {
                        DAMAGE: {
                            target: 'damaged',
                            actions: (context, event) => {
                                context.hp -= event.amount;
                            }
                        }
                    }
                },
                damaged: {
                    on: {
                        HEAL: {
                            target: 'healthy',
                            actions: (context, event) => {
                                context.hp = Math.min(context.hp + event.amount, context.maxHp);
                            }
                        },
                        DAMAGE: {
                            actions: (context, event) => {
                                context.hp -= event.amount;
                                if (context.hp <= 0) {
                                    return 'dead';
                                }
                            }
                        }
                    }
                },
                dead: {
                    type: 'final',
                    entry: () => this.onDeath()
                }
            }
        });
    }
    
    takeDamage(amount) {
        this.changeState({ type: 'DAMAGE', amount });
    }
    
    heal(amount) {
        this.changeState({ type: 'HEAL', amount });
    }
    
    onDeath() {
        this.dispose();
    }
}
```

---

## See Also

- [Scripts](/engine/advanced/scripting/scripts.md) - Alternative behavior system
- [Entity](/engine/advanced/core/entity.md) - Base entity class
- [XState Documentation](https://xstate.js.org/docs/) - Full XState documentation