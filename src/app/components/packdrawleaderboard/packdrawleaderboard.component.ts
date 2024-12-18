import {
  Component,
  SimpleChanges,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackdrawserService } from '../../services/packdrawser.service';

@Component({
  selector: 'app-packdrawleaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packdrawleaderboard.component.html',
  styleUrl: './packdrawleaderboard.component.css'
})
export class PackdrawleaderboardComponent {
  userlists: any;
  finalList: any;
  @ViewChild('days') days!: ElementRef;
  @ViewChild('hours') hours!: ElementRef;
  @ViewChild('minutes') minutes!: ElementRef;
  @ViewChild('seconds') seconds!: ElementRef;
  reward: any = {
    1: 650,
    2: 250,
    3: 150,
    4: 100,
    5: 100,
    6: 75,
    7: 75,
    8: 50,
    9: 25,
    10: 25,
  };
  private countdownInterval: any;

  constructor( private ngZone: NgZone, private packdrawservice:PackdrawserService) {}


  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.countdownInterval = setInterval(() => {
        this.updateCountdown();
      }, 1000);
    });

    const { startDate } = this.getDateRange();
    this.packdrawservice.getPackdrawStats(startDate).subscribe(
      (data) => {
        this.userlists = data;
        this.finalList = this.userlists.leaderboard.slice(0, 10); // Limit to top 10 users
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  private getDateRange() {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1); // 1st of the current month
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1); // 1st of the next month

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
    return new Date(now.getFullYear(), now.getMonth() + 1, 1); // 1st of the next month
  }
}
