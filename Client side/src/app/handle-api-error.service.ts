import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

// Call this service to handle all kind of API Errors

export class HandleApiErrorService {
  public apiError: EventEmitter<any> = new EventEmitter();
  constructor() { }

}
