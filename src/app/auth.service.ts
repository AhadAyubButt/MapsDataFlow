import { Injectable } from "@angular/core";
import { Auth } from "aws-amplify";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor() {
    this.getAgent();
  }

  getAgent() {
    return Auth.currentUserInfo();
  }

}
