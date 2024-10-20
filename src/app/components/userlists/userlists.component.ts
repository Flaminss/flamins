import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { IntegerPipe } from '../../pipe/integer.pipe';

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

  constructor(private userService: UserService) {}

  reAdjustUserName(name: any) {
    if (name.length > 4) {
      return name.slice(0, 4) + '*'.repeat(name.length - 4);
    }
    return name;
  }
  ngOnInit() {
    console.log(this.finalList);

    this.userService.getUserStats().subscribe(
      (data) => {
        console.log(data);
        this.userlists = data;
        this.finalList = this.userlists.slice(3);
      },
      (error) => console.error(error) // Handle error
    );
  }
}
