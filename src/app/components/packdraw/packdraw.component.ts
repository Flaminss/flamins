import { Component } from '@angular/core';
import { PackdrawmiddleComponent } from "../packdrawmiddle/packdrawmiddle.component";
import { PackdrawleaderboardComponent } from "../packdrawleaderboard/packdrawleaderboard.component";

@Component({
  selector: 'app-packdraw',
  standalone: true,
  imports: [PackdrawmiddleComponent, PackdrawleaderboardComponent],
  templateUrl: './packdraw.component.html',
  styleUrl: './packdraw.component.css'
})
export class PackdrawComponent {

}
