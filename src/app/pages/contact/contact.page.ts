import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: false
})
export class ContactPage implements OnInit {
  contacto = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  constructor() { }

  ngOnInit() {
    console.log('Contacto iniciado');
  }

  enviarFormulario() {
    if (this.contacto.nombre && this.contacto.email && this.contacto.mensaje) {
      alert('¡Mensaje enviado!');
      this.contacto = { nombre: '', email: '', mensaje: '' };
    } else {
      alert('Completa los campos, bro.');
    }
  }
}
