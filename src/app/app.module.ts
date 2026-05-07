import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent], // Aquí declaro el componente principal de mi aplicación
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), // Cargo las herramientas de Ionic
    AppRoutingModule, // Mi archivo de rutas para navegar
    HttpClientModule // Muy importante: sirve para traer datos (como los productos) de archivos externos o APIs
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
