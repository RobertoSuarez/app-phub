import { Timestamp } from 'firebase/firestore';

export interface Solution {
  solution: number;
  iterations: number;
  timeElapsed: number;
  servers: Server[];
  date: Timestamp;
}

export interface DateClass {
  seconds: number;
  nanoseconds: number;
}

export interface Server {
  totalClients: number;
  accumulatedCapacity: number;
  hub: Hub;
  clients: Client[];
  capacity: number;
  totalDistance: number;
}

export interface Client {
  hub: Hub;
  distance: number;
}

export interface Hub {
  point: Point;
  demand: number;
  nodeNumber: number;
}

export interface Point {
  x: number;
  y: number;
}
