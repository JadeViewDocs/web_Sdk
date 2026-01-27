// Type definitions for JadeView IPC System
// Project: JadeView WebSDK

// Extend the Window interface to include jade object
declare global {
  interface Window {
    jade?: JadeView;
  }
}

// JadeView main interface
export interface JadeView {
  /**
   * Call backend API and get return result
   * @param command - Backend command name to call
   * @param payload - Data to pass to backend (optional)
   * @returns Promise with backend return result
   */
  invoke: <T = any>(command: string, payload?: any) => Promise<T>;
  
  /**
   * Subscribe to backend events
   * @param eventName - Event name to listen for
   * @param callback - Callback function to call when event is triggered
   * @returns Unsubscribe function
   */
  on: (eventName: string, callback: (payload: any) => void) => () => void;
}

// Export as default for convenience
export default JadeView;