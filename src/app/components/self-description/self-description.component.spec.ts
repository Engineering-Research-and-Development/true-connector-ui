import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDescriptionComponent } from './self-description.component';

describe('SelfDescriptionComponent', () => {
  let component: SelfDescriptionComponent;
  let fixture: ComponentFixture<SelfDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelfDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
