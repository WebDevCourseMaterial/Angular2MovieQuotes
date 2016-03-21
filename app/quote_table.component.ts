import {Component} from "angular2/core";
import {NgFor} from "angular2/common";
import {Moviequote} from "./moviequote.model";
import {Input} from "angular2/core";

@Component({
  selector: 'quote-table',
  templateUrl: 'app/quote_table.component.html',
  directives: [NgFor]
})
export class QuoteTableComponent {

  @Input() private tableQuotes: Moviequote[];

}