import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WSIP, WSTOKEN } from '../shared/localstorage/keys';
import { Router } from '@angular/router';
import { WebsocketService } from '../shared/websocket/websocket.service';


@Component({
  selector: 'app-connect',
  imports: [FormsModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css'
})
export class ConnectComponent {
  constructor (private router: Router) {}

  ip = localStorage.getItem(WSIP);
  token = localStorage.getItem(WSTOKEN);
  roomId = '';

  connect() {
    if (!this.ip || !this.token) return;
    localStorage.setItem(WSIP, this.ip);
    localStorage.setItem(WSTOKEN, this.token);
    this.router.navigate([WebsocketService.encodeIpToken(this.ip, this.token), this.roomId])
  }
}
