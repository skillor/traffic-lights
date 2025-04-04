import { Injectable } from '@angular/core';
import { TrafficCard } from '../../traffic-card/traffic-card.interface';
import { Subject } from 'rxjs';

@Injectable()
export class WebsocketService {

  constructor() { }

  w?: WebSocket;
  roomId?: string;
  obs = new Subject<TrafficCard[]>();

  createWebsocket(id: string, ipToken: string) {
    this.roomId = id;
    const ipObject = WebsocketService.decodeIpToken(ipToken);
    console.log(ipObject)
    const w = new WebSocket(ipObject.ip,
      // ['Authorization', ipObject.token],
    );
    w.onopen = () => {
      w.send('/room ' + ipObject.token + ' ' + id);
    };
    w.onmessage = (msg) => {
      const data = String(msg.data);
      if (data.startsWith('/state ')) {
        try {
          this.obs.next(JSON.parse(data.substring(7)));
        } catch (err) {
          console.error(err);
        }
        return;
      }
    };

    const tryReconnect = () => setTimeout(() => {
      this.reset();
      this.createWebsocket(id, ipToken)
    }, 10000);

    w.onerror = () => tryReconnect();
    w.onclose = () => tryReconnect();
    this.w = w;
  }

  sendState(state: TrafficCard[]) {
    if (!this.w || !this.w.OPEN || !this.roomId) return;
    this.w.send('/state ' + this.roomId + ' ' + JSON.stringify(state));
  }

  static encodeIpToken(ip: string, token: string): string {
    return btoa(token + '@' + ip);
  }

  static decodeIpToken(ipToken: string): {ip: string, token: string} {
    const split = atob(ipToken).split('@');
    return {
      ip: split.slice(1).join('@'),
      token: split[0],
    }
  }

  reset() {
    this.obs.complete();
    this.obs = new Subject<TrafficCard[]>();
    if (this.w) {
      this.w.close(1000);
      this.w = undefined;
    }
  }
}
