import { Component, OnInit } from '@angular/core';
import { SendbirdService } from '../services/sendbird.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.scss']
})
export class ChatAppComponent implements OnInit {

  constructor(private sendbirdSerive:SendbirdService,
              private userService:UserService) {
    this.sendbirdSerive.init();
    this.userService.init();
  }

  ngOnInit(): void {
    this.sendbirdSerive.connectServer(this.userService.userId);
    this.sendbirdSerive.createChannel();
  }

}
