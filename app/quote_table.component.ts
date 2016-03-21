import {Component} from "angular2/core";
import {NgFor} from "angular2/common";
import {Moviequote} from "./moviequote.model";
import {MovieQuotesService} from "./moviequotes.service";

@Component({
  selector: 'quote-table',
  templateUrl: 'app/quote_table.component.html',
})
export class QuoteTableComponent {
  private moviequotes: Array<Moviequote>
  constructor(private _movieQuotesService: MovieQuotesService) { }

  ngOnInit() {
    this._movieQuotesService.getMovieQuotes().then((moviequotes) => {
      this.moviequotes = moviequotes;
    } );
  }
}