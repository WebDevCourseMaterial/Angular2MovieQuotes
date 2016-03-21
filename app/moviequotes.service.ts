import {Injectable} from "angular2/core";
import {MOVIEQUOTES} from "./mock_moviequotes";
import {Moviequote} from "./moviequote.model";

@Injectable()
export class MovieQuotesService {




  getMovieQuotes() {

    // TODO: Use Firebase within the Promise
    return new Promise<Moviequote[]>(resolve => {
      var mqRef = new Firebase("https://fisherds-movie-quotes.firebaseio.com");
      var moviequotes = new Array<Moviequote>();

      mqRef.child("quotes").on("child_added", function (snapshot, prevChildKey) {
        var newMoviequote = snapshot.val();
        console.log("Got a new quote");
        console.log(newMoviequote);
        moviequotes.push(newMoviequote);
        resolve(moviequotes);
      });

      // mqRef.child("quotes").on("value", function (snapshot) {
      //   console.log(snapshot.val());
      //   resolve([new Moviequote("Test", "quote")]);
      // });

    });


  }

}