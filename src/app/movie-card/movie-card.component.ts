// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  genres: any[] = [];
  genreDict: any = {};
  directors: any[] = [];
  directorDict: any = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

ngOnInit(): void {
  this.getMovies();
  this.getGenres();
  this.getDirectors();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

getGenres(): void {
  this.fetchApiData.getAllGenres().subscribe((resp: any) => {
    this.genres = resp;
    for(let i = 0; i < this.genres.length; i++){
      this.genreDict[this.genres[i]._id] = this.genres[i].name;
    }
    return this.genres;
  });
}

getDirectors(): void {
  this.fetchApiData.getAllDirectors().subscribe((resp: any) => {
    this.directors = resp;
    for(let i = 0; i < this.directors.length; i++){
      this.directorDict[this.directors[i]._id] = this.directors[i].name;
    }
    return this.directors;
  });
}

goToProfile(): void {
  this.router.navigate(['users']);
}

addAsFavorite(movieID: string): void {
  this.fetchApiData.addFavorite(movieID).subscribe(() => {
    this.snackbar.open('Movie favorited!', 'OK', {
      duration: 2000
    })
  })
}

removeFromFavorite(movieID: string): void {
  this.fetchApiData.removeFavorite(movieID).subscribe(() => {
    this.snackbar.open('Movie removed from favorites.', 'OK', {
      duration: 2000
    })
  })
}

favoriteCheck(movieID: string) : boolean {
  let user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.favoriteMovies.indexOf(movieID) >= 0;
}

openDetailDialog(title: string, body: string): void {
  let dialogRef = this.dialog.open(DetailsDialogComponent, {
    width: '800px',
  })
  dialogRef.componentInstance.dialogTitle = title;
  dialogRef.componentInstance.dialogBody = body;
}

openGenreDialog(genreID: string): void {
  for(let i = 0; i < this.genres.length; i++){
    if(this.genres[i]._id == genreID) {
      this.openDetailDialog(this.genres[i].name, this.genres[i].description)
    }
  }
}

openDirectorDialog(directorID: string): void {
  for(let i = 0; i < this.directors.length; i++){
    if(this.directors[i]._id == directorID) {
      this.openDetailDialog(this.directors[i].name, this.directors[i].bio)
    }
  }
}

logoutUser(): void {
  localStorage.clear();
  this.router.navigate(['welcome']);
}

}