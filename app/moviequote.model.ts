export class Moviequote {

  constructor(public movie?: string, public quote?: string) {
    this.movie = movie || "";
    this.quote = quote || "";
  }
}
