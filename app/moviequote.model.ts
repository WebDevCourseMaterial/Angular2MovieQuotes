export class Moviequote {

  public key : string;

  constructor(public movie?: string, public quote?: string) {
    this.movie = movie || "";
    this.quote = quote || "";
  }

  static moviequoteFromSnapshot(dataSnapshot : FirebaseDataSnapshot) : Moviequote {
    let newQuote = new Moviequote();
    let value = dataSnapshot.val();
    let key = dataSnapshot.key();
    newQuote.key = key;
    newQuote.movie = value.movie;
    newQuote.quote = value.quote;
    return newQuote;
  }
}
