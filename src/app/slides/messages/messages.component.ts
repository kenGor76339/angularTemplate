import { Component, OnInit ,Output} from '@angular/core';
import { FirebaseCloudService } from 'src/app/services/firebase-cloud.service';
import { AuthGuard } from 'src/app/services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  @Output() outputFunction: ((args: any) => void) | undefined;
  msgBoxInput?: string ='';
  chatArray: any[] ;
  userArray: any[] ;
  clientId?: string;
  

  chatRoomSelector: string;

  constructor( private authGuard: AuthGuard, private firestore: FirebaseCloudService) {
    this.clientId = this.authGuard.user$ == null? "null-ID" : this.authGuard.user$.uid;
    this.chatArray = new Array();
    this.userArray = new Array();
    this.chatRoomSelector = 'undefined';
    this.userArray = [{test:'a'},{test:'b'}]
    let x = this.getChatUser('users');
    this.getChatUser('users').subscribe(
      x => {this.userArray = x;
        console.log(this.userArray)}
      );
  }

  getChatRecord(input:any){
    return this.firestore.getCollection(input);
  }
  getChatUser(input?:any){
    return this.firestore.getCollection(input)
  }

  test(input?:any){
    let x = this.selectChatRoom('root');
  }

  selectChatRoom(input: any){   
    this.chatRoomSelector = input;
    let x = this.getChatRecord(input);
    x.subscribe(x => this.chatArray = x);
    this.chatRoomSelector = input.toString()
  }


  
  testSendMessage(input:any){
    let x = this.firestore.addDoc('root', {
      fromUser: this.authGuard.user$.uid,
      toUser: this.chatRoomSelector,
      messages: input,
    });
    console.log(x);
  }

  tdelete(itemId: string){
    this.firestore.delete(this.chatRoomSelector,itemId);  
  }

  tedit(){
  }

  // myCallbackFunction = (args: any): void => {
  //   //callback code here
  //   console.log(this.getChatRecord());
  //   this.getAllUser();

  // }


  // getAllUser(){
  //   const everyUser = ref(this.fbrtdbService.db, 'root/userId');
  //   this.userArray = [];
  //   onValue(everyUser, (data) => {
  //       console.log(data.val());
  //       data.forEach((childSnapshot) => {
  //         console.log(childSnapshot.val())
  //         this.userArray.push(childSnapshot.val());
  //       });
  //   });
  // }

  // getChatRecord(){
  //   const chatdbRef = ref(this.fbrtdbService.db, '/root/chat/'+this.clientId);
  //   onValue(chatdbRef, (data) => {
  //     this.chatArray = [];
  //     data.forEach((childSnapshot) => {
  //       console.log('look')
  //       console.log(childSnapshot.val())
  //       this.chatArray.push(childSnapshot.val());
  //     });
      
  //   });
  // }

  // setMessage(key:any, value?:string){
  //   let time = new Date();

  //   const clientId = this.auth.user$ == null? "null-ID" : this.auth.user$.uid;
  //   let msg = {
  //     fromUser: clientId,
  //     toUser: name,
  //     time: time.toString() ,
  //     messages :  value
  //   }
  //   console.log(this.fbrtdbService.writeData(+'root/chat/'+clientId+'/'+time,msg));

  // }


  // sendMessage(key:any, value?:string){
  //   let time = new Date();

  //   const clientId = this.auth.user$ == null? "null-ID" : this.auth.user$.uid;
  //   let msg = {
  //     fromUser: clientId,
  //     toUser: name,
  //     time: time.toString() ,
  //     messages :  value
  //   }
  //   console.log(this.fbrtdbService.pushData('root/chat/'+clientId+this.selected2+'/',msg));
  // }


}                                                                         
