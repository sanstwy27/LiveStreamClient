import React, { Component } from 'react';
import axios from 'axios'
import uuid from 'react-uuid'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import './Chat.scss'

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

var sockJS;
var stompClient;
var myUUID = uuid();

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
          messages: [],
        }
    }

    componentDidMount() {
      axios.get('http://localhost:9999/live_room', { withCredentials: true });
      sockJS = new SockJS("http://localhost:9999/live");
      stompClient = Stomp.over(sockJS);
      this.connectSockJs(stompClient);
    }

    frameHandler(frame) {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/group', (message) => {
        this.showMessage(message.body);
      });
      stompClient.subscribe('/topic/online_user', (message) => {
        this.showMessage(message.body);
      });
    }
    
    connectSockJs(stompClient) {
      stompClient.onConnect = (frame) => {
        this.frameHandler(frame)
      };
      stompClient.onWebsocketClose = () => {
        this.onSocketClose(stompClient);
      };
    
      stompClient.activate();
    }
    
    onSocketClose(stompClient) {
      if (stompClient !== null) {
          stompClient.deactivate();
      }
      console.log("Socket was closed. Setting connected to false!")
    }
    
    showMessage(message) {
      var info = JSON.parse(message);
      if(info.creator) {
        var msg = JSON.parse(info.msgBody);
        this.setState({
          messages: [...this.state.messages, { me: msg.invokeId == myUUID, author: info.creator, body: msg.text }],
        })
      } else if(info.ip) {
        //TODO
      } else {
        //TODO
      }
    }
    
    sendMessage(stompClient, text) {
      stompClient.publish({
          destination:"/chat",
          body: JSON.stringify({
            invokeId: myUUID,
            text: text
          }),
          function(frame) {
            console.log(frame.body);
          }
      });
    }

    handleNewMessage = (text) => {
      this.sendMessage(stompClient, text);
    }

    render() {
      return (
        <div className="nginx-chat">
            <MessageList messages={this.state.messages} />
            <MessageForm onMessageSend={this.handleNewMessage} />
        </div>
      );
    }
}

export default Chat;