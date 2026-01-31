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

#### 3. Use Dialog API

```typescript
// Open file dialog
async function openFile() {
  try {
    const result = await window.jade?.dialog.showOpenDialog({
      title: '选择文件',
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Text Files', extensions: ['txt', 'md'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (!result?.canceled) {
      console.log('Selected files:', result.filePaths);
    }
  } catch (error) {
    console.error('Open file dialog failed:', error);
  }
}

// Save file dialog
async function saveFile() {
  try {
    const result = await window.jade?.dialog.showSaveDialog({
      title: '保存文件',
      defaultPath: 'document.txt',
      filters: [
        { name: 'Text File', extensions: ['txt'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (!result?.canceled) {
      console.log('Save path:', result.filePath);
    }
  } catch (error) {
    console.error('Save file dialog failed:', error);
  }
}

// Show message box
async function showConfirm() {
  try {
    const result = await window.jade?.dialog.showMessageBox({
      title: '确认操作',
      message: '确定要删除此文件吗？',
      detail: '此操作不可撤销',
      buttons: ['删除', '取消'],
      defaultId: 1,
      cancelId: 1,
      type: 'warning'
    });

    if (result?.response === 0) {
      console.log('User confirmed deletion');
    } else {
      console.log('User canceled deletion');
    }
  } catch (error) {
    console.error('Show message box failed:', error);
  }
}

// Show error box
async function showError() {
  try {
    await window.jade?.dialog.showErrorBox('错误', '操作失败，请重试');
    console.log('Error box closed');
  } catch (error) {
    console.error('Show error box failed:', error);
  }
}
```

### Importing Types

You can also import specific types if needed:

```typescript
import type {
  JadeView,
  DialogAPI,
  OpenDialogOptions,
  SaveDialogOptions,
  MessageBoxOptions,
  FileFilter,
  DialogProperty,
  MessageBoxType
} from 'jadeview-ipc-types';

// Use the imported types
const handleInvoke = async () => {
  const jadeInstance = window.jade as JadeView;
  if (jadeInstance) {
    const result = await jadeInstance.invoke('testCommand', { key: 'value' });
    console.log('Invoke result:', result);
  }
};

// Define dialog options with type safety
const openDialogOptions: OpenDialogOptions = {
  title: '选择图片',
  properties: ['openFile', 'multiSelections'],
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'All Files', extensions: ['*'] }
  ]
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

### `window.jade.dialog`

Dialog API for showing native dialogs.

#### `window.jade.dialog.showOpenDialog(options)`

Show open file dialog for selecting files.

- **Parameters**:
  - `options`: `OpenDialogOptions` - Dialog options

- **Returns**:
  - `Promise<OpenDialogResult>` - Dialog result

#### `window.jade.dialog.showSaveDialog(options)`

Show save file dialog for selecting save location.

- **Parameters**:
  - `options`: `SaveDialogOptions` - Dialog options

- **Returns**:
  - `Promise<SaveDialogResult>` - Dialog result

#### `window.jade.dialog.showMessageBox(options)`

Show message box for displaying information or getting user input.

- **Parameters**:
  - `options`: `MessageBoxOptions` - Message box options

- **Returns**:
  - `Promise<MessageBoxResult>` - Message box result

#### `window.jade.dialog.showErrorBox(title, content)`

Show error box for displaying error messages.

- **Parameters**:
  - `title`: `string` - Error box title
  - `content`: `string` - Error message content

- **Returns**:
  - `Promise<void>` - Promise

## Type Definitions

### `JadeView`

The main JadeView interface representing the `window.jade` object:

```typescript
interface JadeView {
  invoke: <T = any>(command: string, payload?: any) => Promise<T>;
  on: (eventName: string, callback: (payload: any) => void) => () => void;
  dialog: DialogAPI;
  off?: <T = any>(event: string, listener: (payload: T) => void) => void;
}
```

### Dialog Types

```typescript
// Dialog options
interface DialogOptions {
  title?: string;
  defaultPath?: string;
  buttonLabel?: string;
  filters?: FileFilter[];
  properties?: DialogProperty[];
  blocking?: boolean;
}

// File filter
interface FileFilter {
  name: string;
  extensions: string[];
}

// Dialog property
 type DialogProperty =
  | 'openFile'
  | 'openDirectory'
  | 'multiSelections'
  | 'showHiddenFiles'
  | 'createDirectory'
  | 'promptToCreate'
  | 'noResolveAliases'
  | 'treatPackageAsDirectory';

// Message box type
type MessageBoxType = 'none' | 'info' | 'error' | 'warning' | 'question';
```

### Event Types

```typescript
// Event names
type EventName =
  | 'window-state-changed'
  | 'notification-action'
  | 'toast-dismissed'
  | 'toast-failed'
  | 'dialog-open-file-completed'
  | 'dialog-save-file-completed'
  | 'dialog-message-box-completed'
  | 'dialog-error-box-completed'
  | string;

// Window state changed event
interface WindowStateChangedEvent {
  isMaximized: boolean;
}

// Dialog completed event
interface DialogCompletedEvent {
  canceled: boolean;
  filePaths?: string[];
  filePath?: string;
  response?: number;
}
```

## Notes

- This package only provides type definitions, not the actual implementation
- The implementation is provided by the internal WebView environment
- Ensure that the JadeView IPC system is initialized before using these methods
- The `window.jade` object may be undefined in some environments, so always use optional chaining (`?.`) when accessing it
- Dialog API methods return Promises, so use async/await or .then() for proper handling

## License

MIT