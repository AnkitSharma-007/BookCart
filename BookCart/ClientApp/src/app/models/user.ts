import { UserType } from "./usertype";

export class User {
  userId: number;
  firstName: string;
  lastName: number;
  username: string;
  userTypeName: UserType;

  constructor() {
    this.userId = 0;
    this.firstName = "";
    this.lastName = 0;
    this.username = "";
    this.userTypeName = "Unk";
  }
}
