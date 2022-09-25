import Enum from './enum.js';

export default class KeyboardCommand extends Enum {
  static EXIT = ['Escape', 'Esc'];
  static CONFIRM = ['Enter'];
  static NEXT = ['ArrowRight', 'ArrowDown'];
  static PREVIOUS = ['ArrowLeft', 'ArrowUp'];
}
