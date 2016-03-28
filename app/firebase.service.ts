///<reference path='./firebase.d.ts'/>
import {Injectable} from "angular2/core";
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
     *  Next I will add in immutableJS
     */
    observeArray(url: string): Observable<FirebaseDataSnapshot[]> {
      // For real speed, this should be combined with: 
      // https://facebook.github.io/immutable-js/ see article:
      // http://www.jvandemo.com/how-i-optimized-minesweeper-using-angular-2-and-immutable-js-to-make-it-insanely-fast/
      // Would be fun to speed up, but I don't have time for it :)
      let ref = new Firebase(url);
      let _array: Array<FirebaseDataSnapshot> = [];
      // https://github.com/ReactiveX/rxjs/blob/master/doc/observable.md
      let observable = Observable.create((observer) => {
        let listener1 = ref.on("child_added", snapshot => {
          _array.push(snapshot);
          observer.next(_array);
        });
        let listener2 = ref.on("child_changed", snapshot => {
          for (var i = 0; i < _array.length; i++) {
            if (snapshot.key() === _array[i].key()) {
              _array[i] = snapshot;
              break;
            }
          }
          observer.next(_array);
        });
        let listener3 = ref.on("child_removed", snapshot => {
          for (var i = 0; i < _array.length; i++) {
            if (_array[i].key() === snapshot.key()) {
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
      // See: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-share
      return observable.share();
    }


  observeObject(url: string): Observable<FirebaseDataSnapshot> {
    let ref = new Firebase(url);
    let observable = Observable.create((observer) => {
      let listener = ref.on("value", snapshot => {
        observer.next(snapshot);
      });
      // For cleanup
      return () => {
        ref.off("value", listener);
      };
    });
    // See: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-share
    return observable.share();
  }
}
