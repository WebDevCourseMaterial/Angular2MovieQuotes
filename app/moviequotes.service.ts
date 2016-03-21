import {Injectable} from "angular2/core";
import {Moviequote} from "./moviequote.model";

@Injectable()
export class MovieQuotesService {

  // Warning: This method would create and manage two arrays if called twice.
  getMovieQuotes() {
    return new Promise<Moviequote[]>(resolve => {
      var mqRef = new Firebase("https://fisherds-movie-quotes.firebaseio.com");
      var moviequotes = new Array<Moviequote>();

      mqRef.child("quotes").on("child_added", function (snapshot, prevChildKey) {
        moviequotes.push(snapshot.val());
        resolve(moviequotes);
      });
    });


  }

}