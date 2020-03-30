import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GraphComponent } from './graph/graph.component';
import { CustomMaterialModule } from 'src/app/material.module';
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LiveDataComponent } from './live-data/live-data.component';
import { SpindelSensorComponent } from './spindel-sensor/spindel-sensor.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions =
{
  hostname: environment.mqttBroker.hostname,
  port: environment.mqttBroker.port,
  username: environment.mqttBroker.username,
  password: environment.mqttBroker.password,
  clientId: environment.mqttBroker.clientId,
  path: environment.mqttBroker.path,
};

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    LiveDataComponent,
    SpindelSensorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
