import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Token} from 'src/app/models/token';
import {User} from 'src/app/models/user';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticationUrl = environment.baseUrl;
  private tokenSubject: BehaviorSubject<any>;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;
  public verifiedUser;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.tokenSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
    this.verifiedUser = !!this.currentUserValue ? this.currentUserValue.is_verified : false;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get tokenValue(): Token {
    return this.tokenSubject.value;
  }

  login(loginData) {
    return this.httpClient.post(this.authenticationUrl + 'token/', loginData).pipe(map((tokenObject: Token) => {
      localStorage.setItem('token', JSON.stringify(tokenObject));
      this.tokenSubject.next(tokenObject);
    })).pipe(map(() => {
      this.httpClient.get(this.authenticationUrl + 'user/').subscribe((user: User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.verifiedUser = user.is_verified;
        this.router.navigate(['/home']).then();
      });
    }));
  }

  logout() {
    this.router.navigate(['/']).then(() => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      this.currentUserSubject.next(null);
      this.tokenSubject.next(null);
    });
  }

}
