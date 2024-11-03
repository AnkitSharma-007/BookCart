export class User {
  userId: number;
  firstName: string;
  lastName: number;
  username: string;
  userTypeId: number;
  isLoggedIn: boolean;

  constructor() {
    this.userId = 0;
    this.firstName = "";
    this.lastName = 0;
    this.username = "";
    this.userTypeId = 0;
    this.isLoggedIn = false;
  }
}
