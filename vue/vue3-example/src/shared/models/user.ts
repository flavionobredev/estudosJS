export class User {
  name: string;
  email: string;
  role: string;
  image: string;

  constructor(user: Pick<User, "name" | "email">) {
    this.name = user.name;
    this.email = user.email;
    this.role = "user";
    this.image =
      "http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png";
  }
}
