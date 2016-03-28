import {Component} from "angular2/core";
import {NgFor} from "angular2/common";
import {Moviequote} from "./moviequote.model";
import {FirebaseService} from "./firebase.service";

@Component({
  selector: 'quote-table',
  templateUrl: 'app/quote_table.component.html'
})
export class QuoteTableComponent {
  private moviequotes;
  private firebaseUrl: string = "https://fisherds-movie-quotes.firebaseio.com/quotes";
  constructor(private _movieQuotesService: FirebaseService) {
  }

  ngOnInit() {
    this.moviequotes = this._movieQuotesService.observeArray(this.firebaseUrl);
  }
}
