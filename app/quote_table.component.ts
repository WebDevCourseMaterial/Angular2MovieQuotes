import {Component} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {MovieQuotesService} from "./moviequotes.service";
import {Moviequote} from "./moviequote.model";

@Component({
  selector: 'quote-table',
  templateUrl: 'app/quote_table.component.html',
  inputs: ['firebaseUrl'],
  providers: [MovieQuotesService]
})
export class QuoteTableComponent {
  
  private movieQuotesArrayStream: Observable<Moviequote[]>;
  private firebaseUrl: string;
  
  constructor(private _movieQuotesService: MovieQuotesService) {
  }

  ngOnInit() {
    this.movieQuotesArrayStream = this._movieQuotesService.createMoviequotesStream(
        this.firebaseUrl);
  }
}
