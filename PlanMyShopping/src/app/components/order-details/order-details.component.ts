import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderItem } from 'src/app/common/order-item';
import { Image } from 'src/app/common/image';
import { OrderHistoryService } from 'src/app/services/order-history.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  images: Map<OrderItem, Image> = new Map();
  order: OrderHistory;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private orderHistoryService: OrderHistoryService,  private route: ActivatedRoute, private router: Router, private imageService: ImageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleHistory();
    });
  }

  handleHistory() {
    const historyId = this.route.snapshot.paramMap.get('id');

    this.orderHistoryService.getOrderHistoryItem(historyId).subscribe(
      data => {
        this.order = data;
        for (let item of this.order.orderItems) {
          this.imageService.getImage(item.productId).subscribe(
            image => {
              this.images.set(item, image);
            }
          );
        }
        this.calculateTotalPriceAndQuanity(data);
        console.log(this.order);
      }
    )
  }
  
  calculateTotalPriceAndQuanity(order: OrderHistory) {
    this.totalPrice = 0;
    this.totalQuantity = 0;

    for (let item of order.orderItems) {
      this.totalPrice += item.quantity * item.unitPrice;
      this.totalQuantity += item.quantity;
    }
  }

  getImageFromItem(orderItem: OrderItem) : string {
    let image = this.images.get(orderItem);
    return `data:${image.type};base64,${image.data}`;
  }

}
