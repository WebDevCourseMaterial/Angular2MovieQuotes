///<reference path='./firebase.d.ts'/>
import {Injectable} from "angular2/core";
import {Moviequote} from "./moviequote.model";
// See https://github.com/ReactiveX/rxjs
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/share';

@Injectable()
export class FirebaseService {

    /*
     *  This takes in a FirebaseURL and returns an observable.
     *
     *  An example of using this is:
     *
     *  FirebaseService.observeArray("https://test.firebaseio.com").subscribe((firebaseArray) =>
     *    // Do something with the firebaseArray! This callback will 
     *    // fire with a new array every time a child is
     *    // added, changed, or removed.
     *  );
     *
     *  If only there was a way to parameterize a method in Typescript...
     */
    observeArray(url: string): Observable<any> {
      // For real speed, this should be combined with: 
      // https://facebook.github.io/immutable-js/ see article:
      // http://www.jvandemo.com/how-i-optimized-minesweeper-using-angular-2-and-immutable-js-to-make-it-insanely-fast/
      // Would be fun to speed up, but I don't have time for it :)
      let ref = new Firebase(url);
      let quotes = [];
      // https://github.com/ReactiveX/rxjs/blob/master/doc/observable.md
      let observable = Observable.create((observer) => {
        let listener1 = ref.on("child_added", snapshot => {
          let value = snapshot.val();
          value.key = snapshot.key();
          // Cast
          quotes.push(value);
          observer.next(quotes);
        });
        let listener2 = ref.on("child_changed", snapshot => {
          for (let mq of quotes) {
            if (snapshot.key() == mq.key) {
              let newQuote = snapshot.val();
              mq.movie = newQuote.movie;
              mq.quote = newQuote.quote;
              break;
            }
          }
          observer.next(quotes);
        });
        let listener3 = ref.on("child_removed", snapshot => {
          for (let i = 0; i < quotes.length; i++) {
            if (quotes[i].key == snapshot.key()) {
              quotes.splice(i, 1);
              break;
            }
          }
          observer.next(quotes);
        });
        // For cleanup
        return () => {
          ref.off("child_added", listener1);
          ref.off("child_changed", listener2);
          ref.off("child_removed", listener3);
        };
      });
      // See: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-share
      return observable.share();
    }
}
