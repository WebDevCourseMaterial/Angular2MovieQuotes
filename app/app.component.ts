import {Component} from "angular2/core";
import {TitleComponent} from "./title.component";
import {AddQuoteComponent} from "./add_quote.component";
import {QuoteTableComponent} from "./quote_table.component";
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, FirebaseListObservable} from "angularfire2/angularfire2";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [TitleComponent, AddQuoteComponent, QuoteTableComponent],
  providers: [FIREBASE_PROVIDERS,
    defaultFirebase("https://fisherds-movie-quotes.firebaseio.com/quotes")]
})
export class AppComponent {
  quotesStream: FirebaseListObservable<any[]>;
  
  constructor(private af: AngularFire) {
    this.quotesStream = af.list("/quotes");
  }

  onAddQuoteEvent(mq) {
    // var quotesRef = new Firebase(this.firebaseUrl);
    // quotesRef.push(mq);

    console.log("TODO: Implement.");
    this.quotesStream.push(mq);

  }
}
