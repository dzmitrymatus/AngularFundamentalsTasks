import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError} from 'rxjs/operators';
import * as AuthorsActions from "./authors.actions";
import { AuthorsService } from "src/app/services/authors/authors.service";

@Injectable()
export class AuthorsEffects { 

    getAuthors$ = createEffect(() => this.actions$.pipe(
        ofType(AuthorsActions.requestAuthors),
        mergeMap(() => this.authorsService.getAll()
          .pipe(
            map(authors => AuthorsActions.requestAuthorsSuccess({ authors })),
            catchError(() => of(AuthorsActions.requestAuthorsFail()))
          ))
        )
    );

    addAuthor$ = createEffect(() => this.actions$.pipe(
        ofType(AuthorsActions.requestAddAuthor),
        mergeMap((author) => this.authorsService.addAuthor(author)
          .pipe(
            map((addedAuthor) => AuthorsActions.requestAddAuthorSuccess(addedAuthor)),
            catchError(() => of(AuthorsActions.requestAddAuthorFail()))
          ))
        )
    );

    constructor(private actions$: Actions,
        private authorsService: AuthorsService
      ) {}
}