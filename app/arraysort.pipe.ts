import {Pipe} from "angular2/core";

@Pipe ({
  name: "arraySort",
  pure: false,
})
export class ArraySortPipe {
  transform(array : FirebaseDataSnapshot[]) : FirebaseDataSnapshot[] {
    if (array) {
      array.sort((a: FirebaseDataSnapshot, b: FirebaseDataSnapshot) => {
        return a.key() < b.key() ? 1 : -1;
      });
    }
    return array;
  }
}