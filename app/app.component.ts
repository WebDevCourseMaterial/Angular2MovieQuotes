import {Component} from "angular2/core";
import {TitleComponent} from "./title.component";
import {Moviequote} from "./moviequote.model";
import {AddQuoteComponent} from "./add_quote.component";
import {QuoteTableComponent} from "./quote_table.component";
import {MovieQuotesService} from "./moviequotes.service";
import {OnInit} from "angular2/core";

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [TitleComponent, AddQuoteComponent, QuoteTableComponent],
  providers: [MovieQuotesService],
})
export class AppComponent {
  private moviequotes: Array<Moviequote>

  constructor(private _movieQuotesService: MovieQuotesService) {

  }

  ngOnInit() {
    this._movieQuotesService.getMovieQuotes().then((moviequotes) => {
      this.moviequotes = moviequotes;
    } );
  }

  onAddQuoteEvent(mq) {
    this.moviequotes.unshift(mq);
  }
}
