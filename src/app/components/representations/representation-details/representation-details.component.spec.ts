import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentationDetailsComponent } from './representation-details.component';

describe('RepresentationDetailsComponent', () => {
  let component: RepresentationDetailsComponent;
  let fixture: ComponentFixture<RepresentationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepresentationDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepresentationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
