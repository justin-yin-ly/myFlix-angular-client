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
  /** Injects the HttpClient module to the constructor params.
  *This will provide HttpClient to the entire class, making it available via this.http.
  */
  constructor(private http: HttpClient) {
  }

  
/** Register User - Making the API call for the user registration endpoint
*/
public userRegistration(userDetails: any): Observable<any> {
  return this.http.post(apiUrl + 'users', userDetails).pipe(
  catchError(this.handleError)
  );
}

/** Makes an API call to login the user using provided details from a login form. */
public userLogin(userDetails: any): Observable<any> {
  return this.http.post(apiUrl + 'login', userDetails).pipe(
  catchError(this.handleError)
  );
}

/** Makes an API call to retrieve the full list of movies from the API's /movies endpoint. */
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

/** Makes an API call to the API's movies endpoint and filters the list using a title param to search for a particular movie(s). */
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

/** Makes an API call to retrieve the full list of movies from the API's /directors endpoint. */
getAllDirectors(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'directors', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/** Makes an API call to the API's directors endpoint and filters the list using a name param to search for a particular director(s). */
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

/** Makes an API call to retrieve the full list of genres from the API's /genres endpoint. */
getAllGenres(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'genres', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/** Makes an API call to the API's genres endpoint and filters the list using a name param to search for a particular genre(s). */
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

/** Makes an API call to retrieve the full list of users from the API's /users endpoint. */
getAllUsers(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/** Makes an API call to the API's users endpoint and filters the list using a username param to search for a particular user. */
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

/** Gets a user's favorite movies by using a username param to find a particular user, and then extracts the approrpiate data if a user is found. */
getUserFavorites(username: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    map((data) => data.favoriteMovies),
    catchError(this.handleError)
  );
}

/** Adds a movie to a specified user's list of favorite movies by adding the movieID param to the user's favorites. */
addFavorite(movieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  user.favoriteMovies.push(movieID);
  localStorage.setItem('user', JSON.stringify(user));

  return this.http.post(apiUrl + 'users/' + user.username + '/favorites/' + movieID, {}, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/** Deletes a movie from a specific user's list of favorite movies by removing the movieID param from the user's favorites if found. */
removeFavorite(movieID: string): Observable<any> {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const removeID = user.favoriteMovies.indexOf(movieID);

  if(removeID > -1) {
    user.favoriteMovies.splice(removeID, 1);
  }

  localStorage.setItem('user', JSON.stringify(user))

  return this.http.delete(apiUrl + 'users/' + user.username + '/favorites/' + movieID, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/** Updates a user's account details by making a PUT request with the provided userDetails param. */
editUser(userDetails: any): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users/' + user.username, userDetails, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    })}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

/** Deletes a user from the user registry by using their username and deleting the corresponding user from the database. */
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
        `Error body is: ${error.error.message}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}