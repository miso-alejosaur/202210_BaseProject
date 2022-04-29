/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';

import { PlantListComponent } from './plant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let debug: DebugElement;
  let types = ["Interior", "Exterior"]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ PlantListComponent ],
      providers: [ PlantService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;

    component.plants = []
    for (let i = 0; i < 3; i++) {
      component.plants.push(
        new Plant(
          faker.datatype.number(),
          faker.lorem.word(),
          faker.lorem.word(),
          types[Math.floor(Math.random() * types.length)],
          faker.datatype.number(),
          faker.lorem.word(),
          faker.lorem.sentence()
        )
      )
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table', () => {
    expect(debug.query(By.css('.table'))).toBeTruthy();
  });

  it('table should have a header', () => {
    expect(debug.query(By.css('.table thead'))).toBeTruthy();
  });

  it('table should have a body', () => {
    expect(debug.query(By.css('.table tbody'))).toBeTruthy();
  });

  it('table body should have n rows', () => {
    const tableRows = debug.queryAll(By.css('.table tbody tr'));
    expect(tableRows.length).toEqual(component.plants.length);
  });
});
