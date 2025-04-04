import { Component } from '@angular/core';
import { TrafficCardComponent } from '../traffic-card/traffic-card.component';
import { WebsocketService } from '../shared/websocket/websocket.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TrafficCard } from '../traffic-card/traffic-card.interface';
import { first } from 'rxjs';

@Component({
  selector: 'app-overview',
  imports: [TrafficCardComponent],
  providers: [WebsocketService],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private websocketService: WebsocketService,
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.disconnect();
      this.connect(paramMap);
    });
  }

  loading = true;
  trafficCards: TrafficCard[] = [];
  editMode = false;

  connect(paramMap: ParamMap) {
    const ip = paramMap.get('ip');
    if (ip === null) {
      this.router.navigate([]);
      return;
    }

    const id = paramMap.get('id');
    if (id === null) {
      this.router.navigate([ip, window.crypto.randomUUID()]);
      return;
    }

    this.websocketService.createWebsocket(id, ip);
    this.websocketService.obs.subscribe(cards => {
      console.log(cards);
      this.loading = false;
      this.trafficCards = cards;
    });
  }

  disconnect() {
    this.websocketService.reset();
  }

  newTrafficCard() {
    this.trafficCards.push({
      light: 'red',
      name: 'Anon',
      status: 'waiting for contract'
    });
    this.sendUpdate();
  }

  deleteCard(index: number) {
    this.trafficCards.splice(index, 1);
    this.sendUpdate();
  }

  change(card: TrafficCard) {
    this.sendUpdate();
  }

  sendUpdate() {
    this.websocketService.sendState(this.trafficCards);
  }
}
