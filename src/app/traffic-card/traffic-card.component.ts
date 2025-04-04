import { Component, Input, output } from '@angular/core';
import { TrafficCard } from './traffic-card.interface';

@Component({
  selector: 'app-traffic-card',
  templateUrl: './traffic-card.component.html',
  styleUrl: './traffic-card.component.css'
})
export class TrafficCardComponent {
  @Input({required: true}) data: TrafficCard = {
    name: '',
    light: 'red',
    status: ''
  };

  dataChange = output<TrafficCard>();

  onStatusInput(event: Event) {
    this.data.status = (<any>event.target).value;
    this.dataChange.emit(this.data);
  }

  onNameInput(event: Event) {
    this.data.name = (<any>event.target).value;
    this.dataChange.emit(this.data);
  }
}
