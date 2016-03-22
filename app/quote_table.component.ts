import {Component} from "angular2/core";
import {NgFor} from "angular2/common";
import {Moviequote} from "./moviequote.model";
import {MQObservableService} from "./firebase.service";
import {FirebaseEventPipe} from "./firebase.pipe";

@Component({
  selector: 'quote-table',
  templateUrl: 'app/quote_table.component.html',
  pipes: [FirebaseEventPipe],
})
export class QuoteTableComponent {
  private moviequotes: Array<Moviequote>
  private firebaseUrl;
  constructor(private _movieQuotesService: MQObservableService) {
  }

  ngOnInit() {
    this._movieQuotesService.subscribe((moviequotes) => {
      this.moviequotes = moviequotes;
    });
  }
}
