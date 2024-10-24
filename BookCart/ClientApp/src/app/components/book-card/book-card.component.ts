import { Component, Input } from "@angular/core";
import { Book } from "src/app/models/book";
import { SubscriptionService } from "src/app/services/subscription.service";
import { AddtocartComponent } from "../addtocart/addtocart.component";
import { AddtowishlistComponent } from "../addtowishlist/addtowishlist.component";
import { NgIf, AsyncPipe, CurrencyPipe } from "@angular/common";
import { MatTooltip } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { MatCard, MatCardImage, MatCardContent } from "@angular/material/card";

@Component({
    selector: "app-book-card",
    templateUrl: "./book-card.component.html",
    styleUrls: ["./book-card.component.scss"],
    standalone: true,
    imports: [
        MatCard,
        RouterLink,
        MatTooltip,
        MatCardImage,
        MatCardContent,
        NgIf,
        AddtowishlistComponent,
        AddtocartComponent,
        AsyncPipe,
        CurrencyPipe,
    ],
})
export class BookCardComponent {
  @Input()
  book: Book;

  isActive = false;
  userData$ = this.subscriptionService.userData$;

  constructor(private subscriptionService: SubscriptionService) {}
}
