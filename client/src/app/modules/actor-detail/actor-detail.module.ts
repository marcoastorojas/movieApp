import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorDetailRoutingModule } from './actor-detail-routing.module';
import { ActorDetailComponent } from './actor-detail.component';


@NgModule({
  declarations: [
    ActorDetailComponent
  ],
  imports: [
    CommonModule,
    ActorDetailRoutingModule
  ]
})
export class ActorDetailModule { }
