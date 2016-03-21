import {Component, EventEmitter, Output} from "angular2/core";
import {Moviequote} from "./moviequote.model";


@Component({
  selector: 'add-quote',
  templateUrl: 'app/add_quote.component.html',
  directives: []
})
export class AddQuoteComponent {

  public moviequote: Moviequote;

  @Output("AddQuoteEvent") eventEmitter: EventEmitter<any>;

  constructor() {
    this.moviequote = new Moviequote();
    this.eventEmitter = new EventEmitter();
  }

  addQuote() {
    this.eventEmitter.emit(this.moviequote);
    this.moviequote = new Moviequote();
  }
}