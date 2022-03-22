import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: any) {
    if(user.username == undefined || user.password == undefined || user.username == "" || user.password == "") {
      return false;
    } else {
      console.log("true from validate service");
      return true;
    }
  }

  //Validate Email for regex
}
