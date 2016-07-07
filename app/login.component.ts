import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
// import { HeroFormComponent } from './hero-form.component'
@Component({
  selector: 'login',
  templateUrl: 'app/login.component.html',
  styleUrls: ['app/login.component.css']
})
export class LoginComponent {
  private apiUrl = 'http://fantasy-team-select.herokuapp.com/';  // URL to web api
  title: 'Login';
  username: String = "sangeet";
  password: String = "sangeet";
  error: String = "";
  constructor(private router: Router, private http: Http) { }

  doLogin(username: String, password: String){
    let headers = new Headers({
      'Content-Type': 'application/json'});
    let data = {name: username, password: password};
    this.http
         .post(this.apiUrl + 'login', JSON.stringify(data), {headers: headers})
         .toPromise()
         .then(res => {
           let op = res.json();
           console.log(op);
           if (op.status === 'success'){
             window.localStorage.setItem('loggedIn', 'true');
             window.localStorage.setItem('user', JSON.stringify(op.user));
             this.router.navigate(['Home']);
           } else {
             alert('Invalid Username / Password!');
           }
         })
         .catch(console.log);
  }
}
