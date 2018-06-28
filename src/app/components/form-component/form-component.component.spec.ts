import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } 
  from '@angular/core/testing';

import { FormComponent } from './form-component.component';
import { GetService } from '../../services/get-service.service';
import { HttpClient } from '@angular/common/http';

class MockGetService {
  getCoordinates(address) {
    // address is valid
    return {  
      "info": {
        "statuscode": 0,
        "messages": []
      },
      "options": {
        "maxResults": 1,
        "thumbMaps": true,
        "ignoreLatLngInput": false
      },
      "results": [
        {
          "locations": [
            {
              "street": "",
              "adminArea6": "",
              "adminArea6Type": "Neighborhood",
              "adminArea5": "Washington",
              "adminArea5Type": "City",
              "adminArea4": "District of Columbia",
              "adminArea4Type": "County",
              "adminArea3": "DC",
              "adminArea3Type": "State",
              "adminArea1": "US",
              "adminArea1Type": "Country",
              "postalCode": "",
              "geocodeQualityCode": "A5XAX",
              "geocodeQuality": "CITY",
              "dragPoint": false,
              "sideOfStreet": "N",
              "linkId": "282772166",
              "unknownInput": "",
              "type": "s",
              "latLng": {
                "lat": 38.892062,
                "lng": -77.019912
              }, 
            }
          ]
        }
      ]
    };
  }
}

describe('FormComponent', () => {
  
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let getService: GetService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      declarations: [ FormComponent ],
      providers: [
        { provide: GetService, useClass: MockGetService },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
    
        // GetService from actually injected into the component
        getService = fixture.debugElement.injector.get(GetService);
        
      });
  }));

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have a valid response for address Washington,DC', () => {
    let address = 'Washington,DC';
    let lat = 38.892062; // lat for Washington,DC
    let lng = -77.019912; // lng for Washington,DC
    component.submit(address);
    fixture.detectChanges();
    expect(component.notValid).toEqual(false);
    expect(component.latitude).toEqual(lat); 
    expect(component.longitude).toEqual(lng); 
  });

  
});
