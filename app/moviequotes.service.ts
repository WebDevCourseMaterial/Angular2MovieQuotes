import {Injectable} from "angular2/core";
import {MOVIEQUOTES} from "./mock_moviequotes";

@Injectable()
export class MovieQuotesService {

  getMovieQuotes() {
    return Promise.resolve(MOVIEQUOTES);
  }

}