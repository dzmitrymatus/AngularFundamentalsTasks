import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from "../services/user.service";
import * as UserActions from "./user.actions";

@Injectable()
export class UserEffects { 

    getCurrentUser$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.requestCurrentUser),
        mergeMap(() => this.userService.getUser()
          .pipe(
            map(user => UserActions.requestCurrentUserSuccess({
                user: {
                    name: user.name,
                    isAdmin: user.role === "admin"
                    }
                })
            ),
            catchError(() => of(UserActions.requestCurrentUserFail()))
          ))
        )
      );

    constructor(private actions$: Actions,
        private userService: UserService
      ) {}
}