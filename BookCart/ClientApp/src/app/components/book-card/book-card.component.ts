import { Component, Input } from "@angular/core";
import { Book } from "src/app/models/book";
import { SubscriptionService } from "src/app/services/subscription.service";

@Component({
  selector: "app-book-card",
  templateUrl: "./book-card.component.html",
  styleUrls: ["./book-card.component.scss"],
})
export class BookCardComponent {
  @Input()
  book: Book;

  isActive = false;
  userData$ = this.subscriptionService.userData$;

  constructor(private subscriptionService: SubscriptionService) {}
}
