// Type definitions for JadeView IPC System
// Project: JadeView WebSDK

// ======================== Dialog API ========================

/**
 * 对话框选项基础接口
 */
export interface DialogOptions {
  /** 对话框标题 */
  title?: string;
  /** 默认路径 */
  defaultPath?: string;
  /** 确认按钮的自定义标签 */
  buttonLabel?: string;
  /** 文件过滤器数组 */
  filters?: FileFilter[];
  /** 对话框特性数组 */
  properties?: DialogProperty[];
  /** 是否阻塞进程，默认为 true */
  blocking?: boolean;
}

/**
 * 文件过滤器
 */
export interface FileFilter {
  /** 过滤器显示名称 */
  name: string;
  /** 文件扩展名数组（不包含点号） */
  extensions: string[];
}

/**
 * 对话框特性类型
 */
export type DialogProperty =
  | 'openFile'           // 允许选择文件
  | 'openDirectory'      // 允许选择文件夹
  | 'multiSelections'    // 允许多选
  | 'showHiddenFiles'    // 显示隐藏文件
  | 'createDirectory'    // 允许创建新文件夹（macOS）
  | 'promptToCreate'     // 提示创建文件（Windows）
  | 'noResolveAliases'   // 不解析别名（macOS）
  | 'treatPackageAsDirectory'; // 将包视为文件夹（macOS）

/**
 * 打开文件对话框选项
 */
export interface OpenDialogOptions extends DialogOptions {
  /** 对话框特性数组 */
  properties?: DialogProperty[];
}

/**
 * 保存文件对话框选项
 */
export interface SaveDialogOptions extends DialogOptions {}

/**
 * 消息框选项
 */
export interface MessageBoxOptions {
  /** 消息框标题 */
  title?: string;
  /** 消息框内容 */
  message?: string;
  /** 详细信息 */
  detail?: string;
  /** 按钮文本数组 */
  buttons?: string[];
  /** 默认选中的按钮索引 */
  defaultId?: number;
  /** 取消按钮的索引 */
  cancelId?: number;
  /** 消息框类型 */
  type?: MessageBoxType;
  /** 是否阻塞进程，默认为 true */
  blocking?: boolean;
}

/**
 * 消息框类型
 */
export type MessageBoxType = 'none' | 'info' | 'error' | 'warning' | 'question';

/**
 * 打开文件对话框结果
 */
export interface OpenDialogResult {
  /** 是否取消了对话框 */
  canceled: boolean;
  /** 选择的文件路径数组 */
  filePaths: string[];
}

/**
 * 保存文件对话框结果
 */
export interface SaveDialogResult {
  /** 是否取消了对话框 */
  canceled: boolean;
  /** 选择的保存文件路径 */
  filePath?: string;
}

/**
 * 消息框结果
 */
export interface MessageBoxResult {
  /** 用户点击的按钮索引 */
  response: number;
}

/**
 * 对话框 API
 */
export interface DialogAPI {
  /**
   * 显示打开文件对话框
   * @param options 对话框选项
   * @returns 对话框结果
   */
  showOpenDialog(options: OpenDialogOptions): Promise<OpenDialogResult>;

  /**
   * 显示保存文件对话框
   * @param options 对话框选项
   * @returns 对话框结果
   */
  showSaveDialog(options: SaveDialogOptions): Promise<SaveDialogResult>;

  /**
   * 显示消息框
   * @param options 消息框选项
   * @returns 消息框结果
   */
  showMessageBox(options: MessageBoxOptions): Promise<MessageBoxResult>;

  /**
   * 显示错误框
   * @param title 错误框标题
   * @param content 错误信息内容
   * @returns Promise
   */
  showErrorBox(title: string, content: string): Promise<void>;
}

// ======================== Event System ========================

/**
 * 事件监听器函数类型
 */
export type EventListener<T = any> = (payload: T) => void;

/**
 * 事件名称类型
 */
export type EventName =
  | 'window-state-changed'
  | 'notification-action'
  | 'toast-dismissed'
  | 'toast-failed'
  | 'dialog-open-file-completed'
  | 'dialog-save-file-completed'
  | 'dialog-message-box-completed'
  | 'dialog-error-box-completed'
  | string;

/**
 * 窗口状态变化事件数据
 */
export interface WindowStateChangedEvent {
  isMaximized: boolean;
}

/**
 * 通知动作事件数据
 */
export interface NotificationActionEvent {
  action: string;
  title: string;
  arguments: string;
}

/**
 * 对话框完成事件数据
 */
export interface DialogCompletedEvent {
  canceled: boolean;
  filePaths?: string[];
  filePath?: string;
  response?: number;
}

// ======================== Invoke API ========================

/**
 * Invoke 方法名称类型
 */
export type InvokeMethod =
  | 'setTheme'
  | 'setBackdrop'
  | 'windowAction'
  | 'showToast'
  | string;

/**
 * 主题类型
 */
export type Theme = 'Light' | 'Dark' | 'System' | 'light' | 'dark' | 'system';

/**
 * 背景材料类型
 */
export type BackdropType = 'mica' | 'micaAlt' | 'acrylic';

/**
 * 窗口操作类型
 */
export type WindowAction = 'minimize' | 'maximize' | 'close' | 'restore';

/**
 * 通知选项
 */
export interface ToastOptions {
  title: string;
  body: string;
  body2?: string;
  image_path?: string;
  button1?: string;
  button2?: string;
}

// ======================== Main Jade API ========================

/**
 * JadeView main interface
 */
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
  
  /**
   * Dialog API
   */
  dialog: DialogAPI;
  
  /**
   * Remove event listener (optional)
   * @param event - Event name
   * @param listener - Listener function
   */
  off?: <T = any>(event: string, listener: (payload: T) => void) => void;
}

// Extend the Window interface to include jade object
declare global {
  interface Window {
    jade?: JadeView;
  }
}

// Export as default for convenience
export default JadeView;