import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendbirdService } from '../services/sendbird.service';
import { UserService } from '../services/user.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    SendbirdService,
    UserService,
  ]
})
export class CoreModule { }
