import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostulanteListPageRoutingModule } from './postulante-list-routing.module';

import { PostulanteListPage } from './postulante-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostulanteListPageRoutingModule,
    SharedModule
  ],
  declarations: [PostulanteListPage]
})
export class PostulanteListPageModule {}
