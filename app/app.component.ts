import {Component} from "angular2/core";
import {NgFor} from "angular2/common";
import {TitleComponent} from "./title.component";
import {Moviequote} from "./moviequote.model";
import {AddQuoteComponent} from "./add_quote.component";
import {QuoteTableComponent} from "./quote_table.component";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [NgFor, TitleComponent, AddQuoteComponent, QuoteTableComponent]
})
export class AppComponent {

  private moviequotes: Moviequote[] = [
    {movie: "The Lego Movie", quote: "Everything is awesome!"},
    {movie: "Batman Returns", quote: "I'm Batman"},
    {movie: "Monty Python", quote: "She turned me into a newt!"}
  ];

  onAddQuoteEvent(mq) {
    this.moviequotes.unshift(mq);
  }
}
