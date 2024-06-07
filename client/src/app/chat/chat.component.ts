import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_CHATS = gql`
  query GetChats {
    chats {
      id
      name
      message
      time
      messages {
        text
      }
    }
  }
`;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chats: any[] = [];
  selectedChat: any = null;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: GET_CHATS
    }).valueChanges.subscribe(({ data }) => {
      this.chats = data.chats;
    });
  }

  selectChat(chat: any) {
    this.selectedChat = chat;
  }
}
