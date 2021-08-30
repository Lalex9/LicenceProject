import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: OrderHistory;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private orderHistoryService: OrderHistoryService,  private route: ActivatedRoute, private router: Router) { }

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

}
