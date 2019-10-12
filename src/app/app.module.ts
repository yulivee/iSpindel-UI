import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { GraphSingleTempComponent } from './graph-single-temp/graph-single-temp.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    GraphSingleTempComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
