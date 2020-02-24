import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MuddyComponent } from './muddy/muddy.component';
import { LocationService } from './services/location.service';
import { WeatherService } from './services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AppComponent', () => {
  let weatherService: WeatherService;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MuddyComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FontAwesomeModule
      ],
      providers: [
        LocationService,
        WeatherService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    weatherService = fixture.debugElement.injector.get(WeatherService);
    spyOn(weatherService, 'getWeather').and.returnValue(of(null));
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'MuddyWeb'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('MuddyWeb');
  });
});
