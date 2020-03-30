import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions =
{
  hostname: environment.mqttBroker.hostname,
  port: environment.mqttBroker.port,
  username: environment.mqttBroker.username,
  password: environment.mqttBroker.password,
  clientId: environment.mqttBroker.clientId,
  path: environment.mqttBroker.path,
  protocol: environment.mqttBroker.protocol
};

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
