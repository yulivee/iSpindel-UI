import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import { Paho } from 'ng2-mqtt/mqttws31';

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  private client: Paho.MQTT.Client;
  private mqttbroker: string = "192.168.1.120";

  constructor() {
    this.client = new Paho.MQTT.Client(this.mqttbroker, Number(1883), 'iSpindelUI');
    this.client.onMessageArrived = this.onMessageArrived.bind(this);
    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.client.connect({ userName: 'minion', password: 'IPreferNotTo', onSuccess: this.onConnect.bind(this) });
  }

  private onConnect() {
    console.log('onConnect');
    this.client.subscribe('ispindel/iSpindel0/temperature', {});
    this.client.subscribe('ispindel/iSpindel0/battery', {});
    this.client.subscribe('ispindel/iSpindel0/gravity', {});
  }

  private onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }

  public temperature$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public battery$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public gravity$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private onMessageArrived(message: Paho.MQTT.Message) {
    console.log('onMessageArrived: ' + message.destinationName + ': ' + message.payloadString);

    if (message.destinationName.indexOf('temperature') !== -1) {
      this.temperature$.next(Number(message.payloadString));
    }

    if (message.destinationName.indexOf('battery') !== -1) {
      this.battery$.next(Number(message.payloadString));
    }

    if (message.destinationName.indexOf('gravity') !== -1) {
      this.gravity$.next(Number(message.payloadString));
    }
  }


  public getTemperature(): Observable<number> {
    return this.temperature$.asObservable();
  }

  public getBattery(): Observable<number> {
    return this.battery$.asObservable();
  }

  public getGravity(): Observable<number> {
    return this.gravity$.asObservable();
  }
}
