import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { CartModalComponent } from '../../shared/components/cart-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  // Variable para guardar la lista de productos que vienen del servicio
  products$!: Observable<Product[]>;
  // Cantidad total de productos en el carrito
  cartCount = 0;

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private modalCtrl: ModalController        
  ) {}

  ngOnInit() {
    this.products$ = this.productService.getProducts();
    
    // Me suscribo al carrito para actualizar el contador automáticamente
    this.cartService.getCart().subscribe(items => {
      this.cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    });
  }

  // Función para cuando el usuario toca el botón de comprar
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    console.log('Producto agregado al carrito:', product.name);
  }

  // Nueva función para abrir el modal del carrito
  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalComponent
    });
    return await modal.present();
  }
}
