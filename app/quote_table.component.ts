import {Component} from "angular2/core";
import {NgFor} from "angular2/common";
import {Moviequote} from "./moviequote.model";
import {MovieQuotesService} from "./moviequotes.service";
import {FirebaseEventPipe} from "./firebase.pipe";

@Component({
  selector: 'quote-table',
  templateUrl: 'app/quote_table.component.html',
  pipes: [FirebaseEventPipe],
})
export class QuoteTableComponent {
  private moviequotes: Array<Moviequote>
  private firebaseUrl;
  constructor(private _movieQuotesService: MovieQuotesService) {
    this.firebaseUrl = "https://fisherds-movie-quotes.firebaseio.com/quotes";
  }

  ngOnInit() {
    this._movieQuotesService.getMovieQuotes().then((moviequotes) => {
      this.moviequotes = moviequotes;
    } );
  }
}