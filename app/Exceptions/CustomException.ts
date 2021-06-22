import { Exception } from '@adonisjs/core/build/standalone';

export default class CustomException extends Exception {
  constructor(message: string, status: number, code: string) {
    super(message, status, code);
  }
}
