import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models/product.model';
import { ModalController } from '@ionic/angular';
import { CartModalComponent } from '../../shared/components/cart-modal.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false
})
export class ProductDetailPage implements OnInit {
  product?: Product; // Variable para guardar el producto que encontré
  cartCount = 0;

  constructor(
    private route: ActivatedRoute,       
    private productService: ProductService, 
    private cartService: CartService,
    private modalCtrl: ModalController        
  ) { }

  ngOnInit() {
    // Saco el ID de la ruta (URL)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Si hay un ID, le pido al servicio que me dé los datos de ese producto
      this.productService.getProductById(+id).subscribe(p => {
        this.product = p;
      });
    }

    // Actualizar contador del carrito
    this.cartService.getCart().subscribe(items => {
      this.cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    });
  }

  // Función para agregar este producto específico al carrito
  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      // alert('¡Agregado al carrito!'); // Lo quitamos para que no sea molesto
    }
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalComponent
    });
    return await modal.present();
  }
}
