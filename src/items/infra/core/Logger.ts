import { Injectable, Logger, LoggerService, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerCustom implements LoggerService {
  private prefix: string;
  private logger: Logger;

  init(prefix: string) {
    this.logger = new Logger(prefix);
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.log(message);
  }
  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message);
  }
  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message);
  }
}
