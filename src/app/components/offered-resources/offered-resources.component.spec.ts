import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedResourcesComponent } from './offered-resources.component';

describe('OfferedResourcesComponent', () => {
  let component: OfferedResourcesComponent;
  let fixture: ComponentFixture<OfferedResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferedResourcesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferedResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
