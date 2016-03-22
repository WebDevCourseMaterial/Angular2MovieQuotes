import {Component} from "angular2/core";
import {NgFor} from "angular2/common";
import {Moviequote} from "./moviequote.model";
import {FirebaseService} from "./firebase.service";
import {FirebaseEventPipe} from "./firebase.pipe";

@Component({
  selector: 'quote-table',
  templateUrl: 'app/quote_table.component.html',
  pipes: [FirebaseEventPipe],
})
export class QuoteTableComponent {
  private moviequotes: Array<Moviequote>
  private firebaseUrl: string = "https://fisherds-movie-quotes.firebaseio.com/quotes";
  constructor(private _movieQuotesService: FirebaseService) {
  }

  ngOnInit() {
    this._movieQuotesService.observeArray(this.firebaseUrl).subscribe(moviequotes => {
      this.moviequotes = moviequotes;
    });
  }
}
