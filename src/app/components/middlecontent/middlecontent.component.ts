import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-middlecontent',
  standalone: true,
  imports: [],
  templateUrl: './middlecontent.component.html',
  styleUrl: './middlecontent.component.css'
})
export class MiddlecontentComponent {
 currentRoute: string = '';
  constructor(private router: Router) {}

  getRoobetStyle(): object {
    return {
      opacity: this.router.url === '/' ? 1 : 0.3,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      borderRadius: '100%',
    };
  }

  getPackdrawStyle(): object {
    return {
      opacity: this.router.url === '/packdraw' ? 1 : 0.3,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      borderRadius: '50%',
      objectFit: 'cover',
    };
  }
}
