import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackdrawleaderboardComponent } from './packdrawleaderboard.component';

describe('PackdrawleaderboardComponent', () => {
  let component: PackdrawleaderboardComponent;
  let fixture: ComponentFixture<PackdrawleaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackdrawleaderboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackdrawleaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
