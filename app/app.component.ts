import {Component} from "angular2/core";
import {TitleComponent} from "./title.component";
import {AddQuoteComponent} from "./add_quote.component";
import {QuoteTableComponent} from "./quote_table.component";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [TitleComponent, AddQuoteComponent, QuoteTableComponent],
})
export class AppComponent {

  private firebaseUrl: string = "https://fisherds-movie-quotes.firebaseio.com/quotes";

  onAddQuoteEvent(mq) {
    var quotesRef = new Firebase(this.firebaseUrl);
    quotesRef.push(mq);
  }
}
