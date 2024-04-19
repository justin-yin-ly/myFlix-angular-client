import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent implements OnInit {

  userInfo: any = {username: '', password: '', email: '', birthday: ''}
  userFaves: any [] = [];
  filteredMovies: any[] = [];
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
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getFavorites();
    this.getMovies();
    this.getGenres();
    this.getDirectors();

  }

  getUser() : void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.userInfo = user;
  }

  getFavorites(): void {
    this.fetchApiData.getUserFavorites(this.userInfo.username).subscribe((resp: any) => {
      this.userFaves = resp;
      console.log(this.userFaves);
    })
  }

  goToMovies(): void {
    this.router.navigate(['movies'])
  }

  openEditDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  deleteUser(): void {
    let user = JSON.parse(localStorage.getItem('user') || '{}')
    this.fetchApiData.deleteUser(user.username).subscribe(() => {
      localStorage.clear();
      this.snackbar.open('User deleted.', 'OK', {
        duration: 2000
      });
      this.router.navigate(['welcome']);
    })
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);

        for(let i = 0; i < this.userFaves.length; i++){
          for(let o = 0; o < this.movies.length; o++){
            if(this.movies[o]._id == this.userFaves[i]){
              this.filteredMovies.push(this.movies[o])
            }
          }
        }
        console.log(this.filteredMovies)
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
  
  filterMovies(): void {
    console.log("movies: " + this.movies[0])

    console.log(this.filteredMovies);
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
}
