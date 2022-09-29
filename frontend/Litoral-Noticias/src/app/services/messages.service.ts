import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {


  messages: string[] = []
  constructor() { }

  add(messages:string){
    this.messages.push(messages);

    setTimeout(()=>{ this.clear()}, 3000)
  }

  clear(){
    this.messages = [];
  }
}
