import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/share';
import {Moviequote} from "./moviequote.model";

@Injectable()
export class MovieQuotesService {

  private _moviequotesStream : Observable<Moviequote[]>;

  /*
   *  Takes in a FirebaseURL and returns a stream that emits a movie quotes array.
   */
  createMoviequotesStream(url: string): Observable<Moviequote[]> {
    if (this._moviequotesStream) {
      return this._moviequotesStream;
    }
    let ref = new Firebase(url);
    let _array: Array<Moviequote> = [];
    let observable = Observable.create((observer) => {
      let listener1 = ref.on("child_added", snapshot => {
        _array.unshift(Moviequote.moviequoteFromSnapshot(snapshot));
        observer.next(_array);
      });
      let listener2 = ref.on("child_changed", snapshot => {
        for (var i = 0; i < _array.length; i++) {
          if (snapshot.key() === _array[i].key) {
            _array[i] = Moviequote.moviequoteFromSnapshot(snapshot);
            break;
          }
        }
        observer.next(_array);
      });
      let listener3 = ref.on("child_removed", snapshot => {
        for (var i = 0; i < _array.length; i++) {
          if (_array[i].key === snapshot.key()) {
            _array.splice(i, 1);
            break;
          }
        }
        observer.next(_array);
      });
      // For cleanup
      return () => {
        ref.off("child_added", listener1);
        ref.off("child_changed", listener2);
        ref.off("child_removed", listener3);
      };
    });
    this._moviequotesStream = observable.share();
    return this._moviequotesStream;
  }
}
