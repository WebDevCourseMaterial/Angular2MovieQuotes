import {Injectable, OnInit} from "angular2/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/share';
import {Moviequote} from "./moviequote.model";

@Injectable()
export class MQObservableService implements OnInit {

    private ref: Firebase;
    private quotes: Moviequote[];
    private source: Observable<Moviequote[]>;

    public subscribe(func) {
      // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/observer.md
      this.source.subscribe(func);     
    }

    constructor() {
      // For real speed, this should be combined with: 
      // https://facebook.github.io/immutable-js/ see article:
      // http://www.jvandemo.com/how-i-optimized-minesweeper-using-angular-2-and-immutable-js-to-make-it-insanely-fast/
      // Would be fun to speed up, but I don't have time for it :)
      this.ref = new Firebase("https://rockwotj-moviequotes.firebaseio.com/quotes");
      this.quotes = [];
      // https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/create.md
      let observable = Observable.create((observer) => {
        let listener1 = this.ref.on("child_added", snapshot => {
          let value = snapshot.val();
          value.key = snapshot.key();
          // Cast
          this.quotes.push(<Moviequote>value);
          observer.next(this.quotes);
        });
        let listener2 = this.ref.on("child_changed", snapshot => {
          for (let mq of this.quotes) {
            if (snapshot.key() == mq.key) {
              let newQuote = snapshot.val();
              mq.movie = newQuote.movie;
              mq.quote = newQuote.quote;
              break;
            }
          }
          observer.next(this.quotes);
        });
        let listener3 = this.ref.on("child_removed", snapshot => {
          for (let i = 0; i < this.quotes.length; i++) {
            if (this.quotes[i].key == snapshot.key()) {
              this.quotes.splice(i, 1);
              break;
            }
          }
          observer.next(this.quotes);
        });
        // For cleanup
        return () => {
          this.ref.off("child_added", listener1);
          this.ref.off("child_changed", listener2);
          this.ref.off("child_removed", listener3);
        };
      });
      // See: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/share.md
      this.source = observable.share();
    }
}
