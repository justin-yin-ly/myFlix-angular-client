import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://cinedata-05d7865bba09.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  
// Register User - Making the api call for the user registration endpoint
public userRegistration(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'users', userDetails).pipe(
  catchError(this.handleError)
  );
}

// Login User
public userLogin(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http.post(apiUrl + 'login', userDetails).pipe(
  catchError(this.handleError)
  );
}

// Get All Movies
getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Get One Movie
getMovie(title: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Get Director
getDirector(name: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'directors/' + name, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Get Genre
getGenre(name: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'genres/' + name, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Get User
getUser(username: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Get User's Favorite Movies
getUserFavorites(username: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    map((data) => data.favorites),
    catchError(this.handleError)
  );
}

// Add Movie to User's Favorites
addFavorite(movieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  user.favorites.push(movieID);
  localStorage.setItem('user', JSON.stringify(user));

  return this.http.put(apiUrl + 'users/' + user.username, {}, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Delete Movie from User's Favorites
removeFavorite(movieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const removeID = user.favorites.indexOf(movieID);

  if(removeID > -1) {
    user.favorites.splice(removeID, 1);
  }

  localStorage.setItem('user', JSON.stringify(user))

  return this.http.put(apiUrl + 'users/' + user.username, {}, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Edit User
editUser(userDetails: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users/' + userDetails.username, userDetails, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Delete User
deleteUser(username: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + username, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Non-typed response extraction
private extractResponseData(res: any): any {
  const body = res;
  return body || { };
}

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}