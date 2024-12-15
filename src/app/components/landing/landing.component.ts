import { Component } from '@angular/core';
import { MiddlecontentComponent } from '../middlecontent/middlecontent.component';
import { UserlistsComponent } from '../userlists/userlists.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    MiddlecontentComponent,
    UserlistsComponent,
    HttpClientModule,
    
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
