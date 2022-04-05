// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { UserService } from './user.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserStoreService {

//   private name$$: BehaviorSubject<string> = new BehaviorSubject<string>("");
//   private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

//   public name$: Observable<string> = this.name$$.asObservable();
//   public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

//   constructor(private userService: UserService) { }

//   getUser() {
//     this.userService.getUser().subscribe({
//       next: (data) => {
//          this.name$$.next(data.name); 
//          this.isAdmin$$.next(data.role === "admin");
//         },
//       error: (error) => console.log(`error: ${error}`)
//     });
//   }
// }
