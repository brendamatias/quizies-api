import { Exception } from '@adonisjs/core/build/standalone';

export default class CustomException extends Exception {
  constructor(status: number, message: string) {
    super(message, status);
  }
}
