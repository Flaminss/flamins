import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackdrawmiddleComponent } from './packdrawmiddle.component';

describe('PackdrawmiddleComponent', () => {
  let component: PackdrawmiddleComponent;
  let fixture: ComponentFixture<PackdrawmiddleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackdrawmiddleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackdrawmiddleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
