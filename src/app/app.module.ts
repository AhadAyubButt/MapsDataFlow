import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ListStoreComponent } from './list-store/list-store.component';
import { ListMetricsComponent } from './list-metrics/list-metrics.component';

import { SideNavComponent } from './side-nav/side-nav.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AmplifyAuthenticatorModule } from "@aws-amplify/ui-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DashboardComponent } from './dashboard/dashboard.component';
// import awsconfig from '../aws-exports';
// import { Amplify } from 'aws-amplify';

// Amplify.configure(awsconfig);



@NgModule({
  declarations: [
    AppComponent,
    ListStoreComponent,
    ListMetricsComponent,
    SideNavComponent,
    HomeComponent,
    DashboardComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AmplifyAuthenticatorModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
