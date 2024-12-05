import {
  Component,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userlists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userlists.component.html',
  styleUrls: ['./userlists.component.css'],
})
export class UserlistsComponent implements OnInit, OnDestroy, OnChanges {
  userlists: any;
  finalList: any[] = [];
  @ViewChild('days') days!: ElementRef;
  @ViewChild('hours') hours!: ElementRef;
  @ViewChild('minutes') minutes!: ElementRef;
  @ViewChild('seconds') seconds!: ElementRef;
  reward: any = {
    1: 1200,
    2: 250,
    3: 150,
    4: 100,
    5: 100,
    6: 50,
    7: 50,
    8: 50,
    9: 25,
    10: 25,
  };
  private countdownInterval: any;

  constructor(private userService: UserService, private ngZone: NgZone) {}



  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.countdownInterval = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    });

    const { startDate, endDate } = this.getDateRange();
    this.userService.getUserStats(startDate, endDate).subscribe(
      (data) => {
        this.userlists = data;
        this.finalList = this.userlists.slice(0, 10); // Display top 10 users
      },
      (error) => {
        console.error('API Error (Status):', error.status);
        console.error('API Error (Headers):', error.headers);
        console.error('API Error (Body):', error.message);
      }
    );
  }


  private getDateRange() {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;
  
    // If today's date is before the 15th, start from the 15th of the previous month
    if (now.getDate() < 15) {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 15); // Start from 15th of the previous month
      endDate = new Date(now.getFullYear(), now.getMonth(), 15); // End on the 15th of the current month
    } else {
      startDate = new Date(now.getFullYear(), now.getMonth(), 15); // Start from 15th of the current month
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 15); // End on the 15th of the next month
    }
  
    // Format dates as 'YYYY-MM-DD' and append 'T00:00:00Z'
    const formatDate = (date: Date) => {
      const yyyy = date.getFullYear();
      const mm = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
      const dd = date.getDate().toString().padStart(2, '0');
      return `${yyyy}-${mm}-${dd}T00:00:00Z`;
    };
  
    return {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.updateCountdown();
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
  }

  reAdjustUserName(name: any) {
    if (name.length > 4) {
      return name.slice(0, 4) + '*'.repeat(name.length - 4);
    }
    return name;
  }
  private updateCountdown() {
    const now = new Date();
    const targetDate = this.getNextResetDate();

    if (!targetDate) {
      console.error('Target date is undefined');
      return;
    }

    const timeDiff = targetDate.getTime() - now.getTime();

    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

    if (this.days && this.hours && this.minutes && this.seconds) {
      this.days.nativeElement.innerText = daysLeft;
      this.hours.nativeElement.innerText = hoursLeft;
      this.minutes.nativeElement.innerText = minutesLeft;
      this.seconds.nativeElement.innerText = secondsLeft;
    }
  }

  private getNextResetDate(): Date {
    const now = new Date();
    let resetDate = new Date(now.getFullYear(), now.getMonth(), 15);
    if (now.getDate() > 15) {
      resetDate = new Date(now.getFullYear(), now.getMonth() + 1, 15);
    }
    return resetDate;
  }
}
