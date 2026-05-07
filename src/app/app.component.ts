import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  // Inyectamos el controlador de menú para poder manejarlo desde el código
  constructor(private menu: MenuController) {}

  // Función para cerrar el menú cuando el usuario hace clic en una opción
  closeMenu() {
    this.menu.close();
  }
}
