# JadeView IPC Types

TypeScript type definitions for JadeView IPC system, providing type safety and IntelliSense for front-end developers working with JadeView WebView.

## Installation

```bash
npm install --save-dev jadeview-ipc-types
```

## Usage

### Basic Usage

The type definitions will be automatically recognized by TypeScript when you install the package. You can then use the `window.jade` object with full type safety and IntelliSense.

```typescript
// Subscribe to a message type
const callbackId = window.jade?.ipcMain('messageType', (content) => {
  console.log('Received message:', content);
});

// Send a message
window.jade?.ipcSend('channelName', JSON.stringify({ key: 'value' }));

// Unsubscribe from a message type
window.jade?.ipcRemove('messageType', callbackId);
```

### Importing Types

You can also import specific types if needed:

```typescript
import type { JadeView, JadeViewMessage, JadeViewCallback } from 'jadeview-ipc-types';

// Use the imported types
const handleMessage = (message: JadeViewMessage) => {
  console.log('Message type:', message.type);
  console.log('Message content:', message.content);
};
```

## API Documentation

### `window.jade.ipcMain(type, callback)`

Subscribe to a message type.

- **Parameters**:
  - `type`: `string` - The message type to subscribe to
  - `callback`: `(content: string) => void` - The callback function to be called when a message of the specified type is received

- **Returns**:
  - `number` - A callback ID that can be used to unsubscribe

### `window.jade.ipcRemove(type, callbackId)`

Unsubscribe from a message type.

- **Parameters**:
  - `type`: `string` - The message type to unsubscribe from
  - `callbackId`: `number` - The callback ID returned by `ipcMain`

- **Returns**:
  - `boolean` - Whether the callback was successfully removed

### `window.jade.ipcSend(channel, content)`

Send a message to the native side.

- **Parameters**:
  - `channel`: `string` - The channel name to send the message on
  - `content`: `string` - The content of the message (must be a string)

## Type Definitions

### `JadeView`

The main JadeView interface representing the `window.jade` object.

### `JadeViewMessage`

Interface representing a JadeView message:
```typescript
interface JadeViewMessage {
  type: string;
  content: string;
}
```

### `JadeViewCallback`

Interface representing a JadeView callback function:
```typescript
interface JadeViewCallback {
  (content: string): void;
  _jadeCallbackId: number;
}
```

## Notes

- This package only provides type definitions, not the actual implementation
- The implementation is provided by the internal WebView environment
- Ensure that the JadeView IPC system is initialized before using these methods
- The `window.jade` object may be undefined in some environments, so always use optional chaining (`?.`) when accessing it

## License

MIT