# Workers

The Workers module provides utilities for creating and managing Web Workers, allowing you to offload heavy computations to background threads.

## Import

```javascript
import { createWorker, createPromiseWorker } from "mage-engine";
```

## Functions

### `createWorker(fn, message)`

Creates a Worker from a function and optionally posts a message to it.

**Parameters:**

| Parameter | Type       | Description                            |
| --------- | ---------- | -------------------------------------- |
| `fn`      | `Function` | Function to run in the worker context  |
| `message` | `any`      | Optional message to post to the worker |

**Returns:** `Worker` instance or `null` if workers aren't supported

```javascript
const worker = createWorker(heavyTask, { data: [1, 2, 3] });

if (worker) {
  worker.onmessage = (e) => {
    console.log("Result:", e.data);
    worker.terminate();
  };
}
```

### `createPromiseWorker(fn, message)`

Creates a Promise-based Worker that automatically terminates on completion.

**Parameters:**

| Parameter | Type       | Description                           |
| --------- | ---------- | ------------------------------------- |
| `fn`      | `Function` | Function to run in the worker context |
| `message` | `any`      | Message to post to the worker         |

**Returns:** `Promise` that resolves with the worker's message event

```javascript
const result = await createPromiseWorker(heavyTask, { data: [1, 2, 3] });
console.log("Result:", result.data);
```

## Writing Worker Functions

Worker functions run in an isolated context. Use `self.onmessage` to receive data and `self.postMessage` to send results.

```javascript
const workerTask = () => {
  self.onmessage = (e) => {
    const data = e.data;

    // Perform heavy computation
    const result = processData(data);

    // Send result back
    self.postMessage(result);
  };
};
```

## Examples

### Basic Worker

```javascript
import { createWorker } from "mage-engine";

// Define the task
const sumTask = () => {
  self.onmessage = (e) => {
    const numbers = e.data.numbers;
    const sum = numbers.reduce((a, b) => a + b, 0);
    self.postMessage({ result: sum });
  };
};

// Create and use the worker
const worker = createWorker(sumTask, { numbers: [1, 2, 3, 4, 5] });

if (worker) {
  worker.onmessage = (e) => {
    console.log("Sum:", e.data.result); // 15
    worker.terminate();
  };

  worker.onerror = (error) => {
    console.error("Worker error:", error);
    worker.terminate();
  };
}
```

### Promise-Based Worker

```javascript
import { createPromiseWorker } from "mage-engine";

const fibonacciTask = () => {
  self.onmessage = (e) => {
    const n = e.data.n;

    function fib(n) {
      if (n <= 1) return n;
      return fib(n - 1) + fib(n - 2);
    }

    self.postMessage({ result: fib(n) });
  };
};

// Use with async/await
async function calculateFibonacci(n) {
  try {
    const event = await createPromiseWorker(fibonacciTask, { n });
    return event.data.result;
  } catch (error) {
    console.error("Worker failed:", error);
    return null;
  }
}

// Usage
const result = await calculateFibonacci(40);
console.log("Fibonacci(40):", result);
```

### Physics Calculation

```javascript
const physicsTask = () => {
  self.onmessage = (e) => {
    const { positions, velocities, dt } = e.data;

    // Update positions based on velocities
    const newPositions = positions.map((pos, i) => ({
      x: pos.x + velocities[i].x * dt,
      y: pos.y + velocities[i].y * dt,
      z: pos.z + velocities[i].z * dt,
    }));

    self.postMessage({ positions: newPositions });
  };
};

// In game loop
async function updatePhysics(entities, dt) {
  const positions = entities.map((e) => e.position);
  const velocities = entities.map((e) => e.velocity);

  const result = await createPromiseWorker(physicsTask, {
    positions,
    velocities,
    dt,
  });

  // Apply new positions
  result.data.positions.forEach((pos, i) => {
    entities[i].setPosition(pos.x, pos.y, pos.z);
  });
}
```

### Pathfinding

```javascript
const pathfindingTask = () => {
  self.onmessage = (e) => {
    const { grid, start, end } = e.data;

    // A* pathfinding algorithm
    function findPath(grid, start, end) {
      // ... pathfinding implementation
      return path;
    }

    const path = findPath(grid, start, end);
    self.postMessage({ path });
  };
};

async function findPath(start, end) {
  const result = await createPromiseWorker(pathfindingTask, {
    grid: worldGrid,
    start,
    end,
  });
  return result.data.path;
}
```

### Image Processing

```javascript
const imageProcessTask = () => {
  self.onmessage = (e) => {
    const { imageData, filter } = e.data;
    const data = imageData.data;

    // Apply grayscale filter
    if (filter === "grayscale") {
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg;
      }
    }

    self.postMessage({ imageData });
  };
};
```

## Best Practices

### 1. Keep Workers Focused

Each worker should do one specific task well.

```javascript
// Good: Single responsibility
const sortWorker = () => {
  self.onmessage = (e) => {
    const sorted = e.data.array.sort((a, b) => a - b);
    self.postMessage({ sorted });
  };
};
```

### 2. Handle Errors

Always handle worker errors gracefully.

```javascript
worker.onerror = (error) => {
  console.error("Worker error:", error.message);
  // Fallback to main thread processing
  processOnMainThread(data);
};
```

### 3. Terminate When Done

Always terminate workers when they're no longer needed.

```javascript
// Manual worker
worker.terminate();

// Promise worker auto-terminates
```

### 4. Transfer Large Data

For large ArrayBuffers, use transferable objects.

```javascript
// In worker
const buffer = new ArrayBuffer(1024 * 1024);
self.postMessage({ buffer }, [buffer]);
```

## Limitations

- Workers cannot access the DOM
- Workers cannot access THREE.js objects directly
- Data is copied (serialized) when passed to/from workers
- Some browsers may limit the number of workers

## See Also

- [Math Utilities](/engine/utilities/math.md) - Math functions
- [Features](/engine/utilities/features.md) - Feature detection (check for Web Worker support)
