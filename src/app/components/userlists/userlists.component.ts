import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { IntegerPipe } from '../../pipe/integer.pipe';

@Component({
  selector: 'app-userlists',
  standalone: true,
  imports: [CommonModule,IntegerPipe],
  templateUrl: './userlists.component.html',
  styleUrl: './userlists.component.css',
})
export class UserlistsComponent {
  // userlists: any[] = [
  //   { Username: 'JohnDoe', wagered: 12000, Reward: 1500 },
  //   { Username: 'JaneSmith', wagered: 13000, Reward: 1800 },
  //   { Username: 'AliceJones', wagered: 14000, Reward: 2000 },
  //   { Username: 'BobBrown', wagered: 15000, Reward: 2200 },
  //   { Username: 'CharlieWhite', wagered: 16000, Reward: 2500 },
  //   { Username: 'DianaBlack', wagered: 17000, Reward: 3000 },
  //   { Username: 'EvanBlue', wagered: 18000, Reward: 3500 },
  //   { Username: 'FionaGreen', wagered: 19000, Reward: 4000 },
  //   { Username: 'GeorgeRed', wagered: 20000, Reward: 4500 },
  //   { Username: 'HannahPurple', wagered: 21000, Reward: 5000 },
  // ];
  userlists: any;

  constructor(private userService: UserService) {}

  reAdjustUserName(name: any) {
    if (name.length > 4) {
      return name.slice(0, 4) + '*'.repeat(name.length - 4);
    }
    return name; 
  }
  ngOnInit() {
    this.userService.getUserStats().subscribe(
      (data) => {
        console.log(data); 
        this.userlists = data; 
      },
      (error) => console.error(error) // Handle error
    );
  }
}
