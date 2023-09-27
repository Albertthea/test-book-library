import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdService {
  private idCounter = 11;

  getNextId(): string {
    return (this.idCounter++).toString();
  }
}
