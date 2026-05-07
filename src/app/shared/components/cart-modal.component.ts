import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-modal',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar color="primary">
        <ion-title style="color: black; font-weight: 800;">TU CARRITO ⚡</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()" style="color: black;">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content style="--background: #0b0b0b;">
      <ion-list style="background: transparent;">
        <ion-item *ngFor="let item of cartItems$ | async" style="--background: transparent; --color: white; margin-bottom: 10px;">
          <ion-thumbnail slot="start" style="background: white; border-radius: 8px; padding: 5px;">
            <img [src]="item.image" />
          </ion-thumbnail>
          <ion-label>
            <h2 style="font-weight: 700;">{{ item.name }}</h2>
            <p style="color: #ccff00;">{{ item.quantity }} x {{ item.price | currency }}</p>
          </ion-label>
          <ion-button slot="end" fill="clear" color="danger" (click)="remove(item.id)">
            <ion-icon name="trash-outline"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>

      <div *ngIf="(cartItems$ | async)?.length === 0" style="text-align: center; margin-top: 50px; color: #666;">
        <ion-icon name="cart-outline" style="font-size: 64px;"></ion-icon>
        <p>Tu carrito está vacío, fiera.</p>
      </div>
    </ion-content>

    <ion-footer class="ion-no-border" style="background: #121212; padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <span style="color: white; font-weight: 700;">TOTAL:</span>
        <span style="color: #ccff00; font-size: 24px; font-weight: 900;">{{ total | currency }}</span>
      </div>
      <ion-button expand="block" color="primary" [disabled]="total === 0" style="color: black; font-weight: 800; height: 50px; --border-radius: 25px;">
        FINALIZAR COMPRA 🚀
      </ion-button>
    </ion-footer>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CartModalComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  total = 0;

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.cartItems$ = this.cartService.getCart();
    this.cartItems$.subscribe(items => {
      this.total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    });
  }

  remove(id: number) {
    this.cartService.removeFromCart(id);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
