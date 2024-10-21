// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { UserService } from '../../services/user.service';
// import { CommonModule } from '@angular/common';
// import { IntegerPipe } from '../../pipe/integer.pipe';
// import { interval, Subscription } from 'rxjs';

// @Component({
//   selector: 'app-userlists',
//   standalone: true,
//   imports: [CommonModule, IntegerPipe],
//   templateUrl: './userlists.component.html',
//   styleUrls: ['./userlists.component.css'], // Fixed typo
// })
// export class UserlistsComponent implements OnInit, OnDestroy {
//   userlists: any;
//   finalList: any[] = [];
//   daysLeft: number = 0;
//   hoursLeft: number = 0;
//   minutesLeft: number = 0;
//   secondsLeft: number = 0;

//   private subscription: Subscription = new Subscription();

//   constructor(private userService: UserService) {}

//   reAdjustUserName(name: any) {
//     if (name.length > 4) {
//       return name.slice(0, 4) + '*'.repeat(name.length - 4);
//     }
//     return name;
//   }

//   ngOnInit() {
//     console.log(this.finalList);
//     this.startCountdown();
//     this.userService.getUserStats().subscribe(
//       (data) => {
//         console.log(data);
//         this.userlists = data;
//         this.finalList = this.userlists.slice(3);
//       },
//       (error) => console.error(error) // Handle error
//     );
//   }

//   ngOnDestroy(): void {
//     this.subscription.unsubscribe(); // Cleanup the subscription on destroy
//   }

//   private startCountdown() {
//     this.updateCountdown(); // Initial call

//     // Update the countdown every second
//     this.subscription = interval(1000).subscribe(() => {
//       this.updateCountdown();
//     });
//   }

//   private updateCountdown() {
//     const now = new Date();
//     const targetDate = this.getNextResetDate();

//     const timeDiff = targetDate.getTime() - now.getTime(); // Difference in milliseconds

//     this.daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//     this.hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     this.minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//     this.secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);
//   }

//   private getNextResetDate(): Date {
//     const now = new Date();
//     let resetDate = new Date(now.getFullYear(), now.getMonth(), 15); // 15th of the current month

//     // If today is past the 15th, set reset date to the 15th of the next month
//     if (now.getDate() > 15) {
//       resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 15);
//     }

//     return resetDate;
//   }
// }

// import { Component } from '@angular/core';
// import { UserService } from '../../services/user.service';
// import { CommonModule } from '@angular/common';
// import { IntegerPipe } from '../../pipe/integer.pipe';

// @Component({
//   selector: 'app-userlists',
//   standalone: true,
//   imports: [CommonModule, IntegerPipe],
//   templateUrl: './userlists.component.html',
//   styleUrl: './userlists.component.css',
// })
// export class UserlistsComponent {
//   userlists: any;
//   finalList: any[] = [];

//   constructor(private userService: UserService) {}

//   reAdjustUserName(name: any) {
//     if (name.length > 4) {
//       return name.slice(0, 4) + '*'.repeat(name.length - 4);
//     }
//     return name;
//   }
//   ngOnInit() {
//     console.log(this.finalList);

//     this.userService.getUserStats().subscribe(
//       (data) => {
//         console.log(data);
//         this.userlists = data;
//         this.finalList = this.userlists.slice(3);
//       },
//       (error) => console.error(error) // Handle error
//     );
//   }
// }

import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { IntegerPipe } from '../../pipe/integer.pipe';
import { interval, Subscription } from 'rxjs';
import moment from 'moment'; // Optional, only if using Moment.js

@Component({
  selector: 'app-userlists',
  standalone: true,
  imports: [CommonModule, IntegerPipe],
  templateUrl: './userlists.component.html',
  styleUrl: './userlists.component.css',
})
export class UserlistsComponent {
  userlists: any;
  finalList: any[] = [];
  daysLeft: number = 0;
  hoursLeft: number = 0;
  minutesLeft: number = 0;
  secondsLeft: number = 0;

  private subscription: Subscription = new Subscription();

  constructor(private userService: UserService) {}

  reAdjustUserName(name: any) {
    if (name.length > 4) {
      return name.slice(0, 4) + '*'.repeat(name.length - 4);
    }
    return name;
  }
  ngOnInit() {
    console.log(this.finalList);
    this.startCountdown();
    this.userService.getUserStats().subscribe(
      (data) => {
        console.log(data);
        this.userlists = data;
        this.finalList = this.userlists.slice(3);
      },
      (error) => console.error(error) // Handle error
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Cleanup the subscription on destroy
  }
  private startCountdown() {
    this.updateCountdown(); // Initial call

    // Update the countdown every second
    this.subscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }
  private updateCountdown() {
    const now = moment(); // Current date and time
    const targetDate = this.getNextResetDate();

    const duration = moment.duration(targetDate.diff(now));

    this.daysLeft = Math.floor(duration.asDays());
    this.hoursLeft = duration.hours();
    this.minutesLeft = duration.minutes();
    this.secondsLeft = duration.seconds();
  }

  private getNextResetDate(): moment.Moment {
    const now = moment();
    let resetDate = moment().date(15).startOf('day'); // 15th of the current month

    // If today is past the 15th, set reset date to next month's 15th
    if (now.isAfter(resetDate)) {
      resetDate = resetDate.add(1, 'month');
    }

    return resetDate;
  }
}
