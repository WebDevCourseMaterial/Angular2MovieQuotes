import {Component} from "angular2/core";
import {FirebaseService} from "./firebase.service";
import {Observable} from "rxjs/Observable";
import {ArraySortPipe} from "./arraysort.pipe";

@Component({
  selector: 'quote-table',
  templateUrl: 'app/quote_table.component.html',
  providers: [FirebaseService],
  pipes: [ArraySortPipe]
})
export class QuoteTableComponent {
  private movieQuotesArrayStream: Observable<FirebaseDataSnapshot[]>;
  private firebaseUrl: string = "https://fisherds-movie-quotes.firebaseio.com/quotes";
  constructor(private _movieQuotesService: FirebaseService) {
  }

  ngOnInit() {
    this.movieQuotesArrayStream = this._movieQuotesService.observeArray(this.firebaseUrl);
  }
}
