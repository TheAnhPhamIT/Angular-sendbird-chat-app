import { Injectable } from '@angular/core';
import { config } from '../constant/constant';
import * as SendBird from 'sendbird';

@Injectable({
  providedIn: 'root'
})
export class SendbirdService {
  appId:string; 
  sb;
  openChannel;
  constructor() {
    this.sb = null;
    this.openChannel = null;
    this.appId = config.sendbird.APP_ID;
  }

  init() {
    if(this.sb) return;
    this.sb = new SendBird({appId:this.appId});
  }

  connectServer(userId:string) {
    // The USER_ID below should be unique to your Sendbird application.
    this.sb.connect(userId, function(user, error) {
      if (error) {
          // Handle error.
      }
      console.log(user);
      console.log('connected successfull')
      // The user is connected to Sendbird server.
    });
  }

  createChannel() {
    this.sb.OpenChannel.createChannel(function(openChannel, error) {
      if (error) {
          // Handle error.
      }
      this.openChannel = openChannel;
      console.log(openChannel)
      // An open channel is successfully created.
      // Through the "openChannel" parameter of the callback function,
      // you can get the open channel's data from the result object that Sendbird server has passed to the callback function
    });
  }

  enterChannel(channelUrl:string) {
    // The CHANNEL_URL below can be retrieved using the openChannel.channelUrl.
    this.sb.OpenChannel.getChannel(channelUrl, function(openChannel, error) {
      if (error) {
          // Handle error.
      }

      // Call the instance method of the result object in the "openChannel" parameter of the callback function.
      this.openChannel = openChannel
      this.openChannel.enter(function(response, error) {
          if (error) {
              // Handle error.
          }

          // The current user successfully enters the open channel,
          // and can chat with other users in the channel by using APIs.
      });
    });
  }

  sendMessage(message:string='', data=null, customType=null) {
    if(message.trim() === '') return;
    const params = new this.sb.UserMessageParams();
    params.message = message;
    params.data = data;
    params.customType = customType;

    this.openChannel.sendUserMessage(params, function(message, error) {
      if (error) {
        // Handle error.
      }
      console.log(message)
      // The message is successfully sent to the channel.
      // The current user can receive messages from other users through the onMessageReceived() method of an event handler.
    });
  }
}
