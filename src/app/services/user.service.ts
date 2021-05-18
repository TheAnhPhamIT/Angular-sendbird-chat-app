import { Injectable } from '@angular/core';

interface User {
  _id: string;
  username: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user:User;
  constructor() {
    this.user = null;
  }

  init() {
    if(this.user) return;
    this.user = {
      _id: this.create_UUID(),
      username: null,
      avatar: null
    }
  }

  set username(val) {
    this.user.username = val;
  }

  set avatar(val) {
    this.user.avatar = val;
  }

  get userId() {
    return this.user._id;
  }

  private create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
}
