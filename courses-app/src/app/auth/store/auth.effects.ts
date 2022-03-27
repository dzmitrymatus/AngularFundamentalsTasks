import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";
import * as AuthActions from "./auth.actions";
import { UserAuthStoreModel } from "./auth.models";

@Injectable()
export class AuthEffects { 

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.requestLogin),
        mergeMap((userAuthModel: UserAuthStoreModel) => this.authService.login(userAuthModel)
          .pipe(
            map(userToken => AuthActions.requestLoginSuccess({ userToken })
            ),
            catchError((error) => of(AuthActions.requestLoginFail({ error })))
          ))
        )
    );

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.requestLogout),
        mergeMap(() => this.authService.logout()
          .pipe(
            map(() => AuthActions.requestLogoutSuccess()
            ),
            catchError((error) => of(AuthActions.requestLogoutFail({ error })))
          ))
        )
    );

    register$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.requestRegister),
      mergeMap((userAuthModel: UserAuthStoreModel) => this.authService.register(userAuthModel)
        .pipe(
          map((user) => AuthActions.requestRegisterSuccess(user)
          ),
          catchError((error) => of(AuthActions.requestRegisterFail({ error })))
        ))
      )
  );

    constructor(
        private actions$: Actions,
        private authService: AuthService
      ) {}
}