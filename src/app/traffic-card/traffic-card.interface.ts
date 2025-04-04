export interface TrafficCard {
  name: string; // name of the user
  light: 'red' | 'yellow' | 'green'; // color of the light
  status: string; // additional status info
}
