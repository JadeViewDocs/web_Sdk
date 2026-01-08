// Type definitions for JadeView IPC System
// Project: JadeView WebSDK

// Extend the Window interface to include jade object
declare global {
  interface Window {
    jade?: JadeView;
    Jade?: {
      ipc?: {
        postMessage?: (message: string) => void;
        onMessage?: (message: JadeViewMessage) => void;
      };
    };
    ipc?: {
      postMessage?: (message: string) => void;
    };
  }
}

// JadeView message type
export interface JadeViewMessage {
  type: string;
  content: string;
}

// JadeView callback type
export type JadeViewCallback = ((content: string) => void) & {
  _jadeCallbackId: number;
}; 
// JadeView main interface
export interface JadeView {
  /**
   * IPC main method for subscribing to message types
   * @param type - Message type to subscribe to
   * @param callback - Callback function to be called when message is received
   * @returns Callback ID for unsubscribing
   */
  ipcMain: (type: string, callback: (content: string) => void) => number;
  
  /**
   * Remove IPC subscription by type and callback ID
   * @param type - Message type to unsubscribe from
   * @param callbackId - Callback ID returned by ipcMain
   * @returns Whether the callback was successfully removed
   */
  ipcRemove: (type: string, callbackId: number) => boolean;
  
  /**
   * Send IPC message to the native side
   * @param channel - Channel name to send message on
   * @param content - Content of the message (must be a string)
   */
  ipcSend: (channel: string, content: string) => void;
  
  /**
   * Internal callback registry (do not use directly)
   */
  _callbacks?: Map<string, JadeViewCallback[]>;
  
  /**
   * Internal message handler (do not use directly)
   * @param msg - Message object to handle
   */
  _handleMessage?: (msg: JadeViewMessage) => void;
}

// Export as default for convenience
export default JadeView;