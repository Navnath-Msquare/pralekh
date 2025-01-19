import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialPackagesComponent } from './special-packages.component';

describe('SpecialPackagesComponent', () => {
  let component: SpecialPackagesComponent;
  let fixture: ComponentFixture<SpecialPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialPackagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
