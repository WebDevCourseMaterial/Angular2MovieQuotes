export class Moviequote {

  public key: string;

  constructor(public movie?: string, public quote?: string) {
    this.movie = movie || "";
    this.quote = quote || "";
  }
}
