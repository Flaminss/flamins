import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackdrawComponent } from './packdraw.component';

describe('PackdrawComponent', () => {
  let component: PackdrawComponent;
  let fixture: ComponentFixture<PackdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackdrawComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
