import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concat, Observable, of } from "rxjs";
import { map, mergeMap, catchError, tap} from 'rxjs/operators';
import { AuthService } from "../services/auth.service";
import * as AuthActions from "./auth.actions";
import * as UserActions from "../../user/store/user.actions";
import { UserAuthStoreModel } from "./auth.models";

@Injectable()
export class AuthEffects { 

    login$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.requestLogin),
        mergeMap((userAuthModel: UserAuthStoreModel) => this.authService.login(userAuthModel)
          .pipe(
            map(userToken => AuthActions.requestLoginSuccess({ userToken })),
            tap(() => this.router.navigateByUrl('/courses')),
            catchError((error) => of(AuthActions.requestLoginFail({ error })))
          ))
        )
    );

    loginSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.requestLoginSuccess),
      map(() => UserActions.requestCurrentUser())
      )
    );

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.requestLogout),
        mergeMap(() => this.authService.logout()
          .pipe(
            map(() => AuthActions.requestLogoutSuccess()),
            tap(() => this.router.navigateByUrl('/login')),
            catchError((error) => of(AuthActions.requestLogoutFail({ error })))
          ))
        )
    );

    register$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.requestRegister),
      mergeMap((userAuthModel: UserAuthStoreModel) => this.authService.register(userAuthModel)
        .pipe(
          map((user) => AuthActions.requestLogin(user)),
          catchError((error) => of(AuthActions.requestRegisterFail({ error })))
        ))
      )
  );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
      ) {}
}