import {Component} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Moviequote} from "./moviequote.model";
import {AngularFire, FirebaseListObservable} from "angularfire2/angularfire2";
import 'rxjs/Rx';

@Component({
  selector: 'quote-table',
  templateUrl: 'app/quote_table.component.html',
  inputs: ['firebaseUrl'],
  providers: []
})
export class QuoteTableComponent {
  
  // private movieQuotesArrayStream: Observable<Moviequote[]>;

  private movieQuotesArrayStream: FirebaseListObservable<any[]>;
  // private firebaseUrl: string;
  
  constructor(private af: AngularFire) {
    this.movieQuotesArrayStream = af.list("/quotes");
  }

  // ngOnInit() {
  //   this.movieQuotesArrayStream = this._movieQuotesService.createMoviequotesStream(
  //       this.firebaseUrl);
  // }
}
