import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
  standalone: false
})
export class PersonalInfoPage implements OnInit {
  user = {
    name: 'Adrian Sandoval',
    role: 'DATOS DEL ESTUDIANTE',
    career: 'Ingeniería en Sistemas',
    bio: 'Soy un estudiante con un gran interés en el mundo del fitness, los negocios y el desarrollo de aplicaciones móviles.',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&q=80', // Placeholder circular
    specialties: ['Desarrollo Móvil (Ionic/Angular)', 'Diseño UI/UX', 'Base de Datos (SQL)']
  };

  constructor() { }

  ngOnInit() {
  }

}
