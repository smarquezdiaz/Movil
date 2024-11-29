import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCompanyPageRoutingModule } from './register-company-routing.module';

import { RegisterCompanyPage } from './register-company.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCompanyPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  declarations: [RegisterCompanyPage]
})
export class RegisterCompanyPageModule {}
