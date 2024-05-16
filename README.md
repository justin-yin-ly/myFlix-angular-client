# MyFlix Angular Client-side App
This is a web application akin to a previous project, [MyFlix](https://github.com/justin-yin-ly/myFlix-client), only instead of using React to generate the front end, it makes use of Angular.
Just like with the previous iteration of this app, users can register a new account or login with a previously created account in order to view the movie database, which hosts information on films, genres, and directors.
Users can also manage their accounts, updating profile information, adding and/or removing movies from a list of favorite films, or deleting their account if they so choose.

## Using this App
Upon visiting the live app, users will be directed to a welcome page where they will have the options to either register a new account, or login using a previously made account.
After logging in with an account, users will be redirected to a view containing the full list of movies from the database. Clicking on a movie reveals more information about that particular movie. 
There are also buttons for displaying information about the particular genre and/or director of that movie. Next to those buttons is another button for adding or removing that movie to the user's list of favorite movies.
Outside of the main view, we have the profile view, where the user can view their account's information, edit said information, view their list of favorite movies, or delete their account.
The user is able to logout at any time by pressing the 'Logout' button, at which point the user will be redirected back to the welcome page.

## Links
* [Live App](https://justin-yin-ly.github.io/myFlix-angular-client)
* [API Repo](https://github.com/justin-yin-ly/myFlix-api)

## Dependencies
* Angular
* RXJS
* TypeDoc

The full list of project dependencies can be found at the package-lock-json file, found [here](https://github.com/justin-yin-ly/myFlix-angular-client/blob/main/package-lock.json).

## Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
