import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentationsComponent } from './representations.component';

describe('RepresentationsComponent', () => {
  let component: RepresentationsComponent;
  let fixture: ComponentFixture<RepresentationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepresentationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepresentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
