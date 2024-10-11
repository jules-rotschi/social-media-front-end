import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousConnexionComponent } from './anonymous-connexion.component';

describe('AnonymousConnexionComponent', () => {
  let component: AnonymousConnexionComponent;
  let fixture: ComponentFixture<AnonymousConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnonymousConnexionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonymousConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
