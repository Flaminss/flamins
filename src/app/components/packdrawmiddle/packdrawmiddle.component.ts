import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packdrawmiddle',
  standalone: true,
  imports: [],
  templateUrl: './packdrawmiddle.component.html',
  styleUrl: './packdrawmiddle.component.css'
})
export class PackdrawmiddleComponent {
  currentRoute: string = '';
  constructor(private router: Router) {}

  getRoobetOpacity(): number {
    return this.router.url === '/' ? 1 : 0.3;
  }

  getPackdrawOpacity(): number {
    return this.router.url === '/packdraw' ? 1 : 0.3;
  }

}
