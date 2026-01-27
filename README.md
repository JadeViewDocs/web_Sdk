# JadeView IPC Types

TypeScript type definitions for JadeView IPC system, providing type safety and IntelliSense for front-end developers working with JadeView WebView.

## Installation

```bash
npm install --save-dev jadeview-ipc-types
```

## Usage

### Basic Usage

The type definitions will be automatically recognized by TypeScript when you install the package. You can then use the `window.jade` object with full type safety and IntelliSense.

#### 1. Call Backend API

```typescript
// Call backend API and get result
async function sendMessage() {
  try {
    const messageData = {
      timestamp: Date.now(),
      data: '测试消息',
    };
    const result = await window.jade?.invoke('message', messageData);
    console.log('Backend return result:', result);
  } catch (error) {
    console.error('Call failed:', error);
  }
}

// Set window backdrop
async function setBackdrop(backdropType: string) {
  try {
    await window.jade?.invoke('setBackdrop', backdropType);
    console.log('Backdrop set successfully:', backdropType);
  } catch (error) {
    console.error('Set backdrop failed:', error);
  }
}
```

#### 2. Subscribe to Events

```typescript
// Subscribe to theme change events
const unsubscribeTheme = window.jade?.on('setTheme', (payload) => {
  console.log('Theme change event:', payload);
  // Handle theme change logic
});

// Subscribe to window state change events
const unsubscribeWindowState = window.jade?.on('window-state-changed', (payload) => {
  console.log('Window state changed:', payload);
  // Handle window state change logic
});

// Unsubscribe when done
// unsubscribeTheme();
// unsubscribeWindowState();
```

### Importing Types

You can also import specific types if needed:

```typescript
import type { JadeView } from 'jadeview-ipc-types';

// Use the imported types
const handleInvoke = async () => {
  const jadeInstance = window.jade as JadeView;
  if (jadeInstance) {
    const result = await jadeInstance.invoke('testCommand', { key: 'value' });
    console.log('Invoke result:', result);
  }
};
```

## API Documentation

### `window.jade.invoke(command, payload)`

Call backend API and get return result.

- **Parameters**:
  - `command`: `string` - Backend command name to call
  - `payload`: `any` - Data to pass to backend (optional)

- **Returns**:
  - `Promise<T>` - Promise with backend return result

### `window.jade.on(eventName, callback)`

Subscribe to backend events.

- **Parameters**:
  - `eventName`: `string` - Event name to listen for
  - `callback`: `(payload: any) => void` - Callback function to call when event is triggered

- **Returns**:
  - `() => void` - Unsubscribe function

## Type Definitions

### `JadeView`

The main JadeView interface representing the `window.jade` object:

```typescript
interface JadeView {
  invoke: <T = any>(command: string, payload?: any) => Promise<T>;
  on: (eventName: string, callback: (payload: any) => void) => () => void;
}
```

## Notes

- This package only provides type definitions, not the actual implementation
- The implementation is provided by the internal WebView environment
- Ensure that the JadeView IPC system is initialized before using these methods
- The `window.jade` object may be undefined in some environments, so always use optional chaining (`?.`) when accessing it

## License

MIT