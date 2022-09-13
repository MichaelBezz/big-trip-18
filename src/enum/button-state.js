import Enum from './enum.js';

export default class ButtonState extends Enum {
  static SUBMIT_NORMAL = 'Save';
  static SUBMIT_PROCESS = 'Saving...';
  static RESET_NORMAL = 'Delete';
  static RESET_PROCESS = 'Deleting...';
}
