import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphComponent } from 'src/app/graph/graph.component';

const routes: Routes = [
    { path: '', component: GraphComponent },
    { path: 'newMeasure', component: GraphComponent },
    { path: 'viewMeasure', component: GraphComponent },
    /*
    { path: 'kitchen', component: KitchenComponent },
    { path: 'floor', component: FloorComponent },
    { path: 'bathroom', component: BathroomComponent }
    */
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
