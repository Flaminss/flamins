import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-userlists',
  standalone: true,
  imports: [],
  templateUrl: './userlists.component.html',
  styleUrl: './userlists.component.css'
})
export class UserlistsComponent {

  constructor(private userService: UserService){

  }

  ngOnInit() {
    this.userService.getUserStats().subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }
 

}
