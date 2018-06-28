import { TestBed, getTestBed, fakeAsync } from '@angular/core/testing';
import { GetService } from './get-service.service';
import { KEY } from '../secret';

import { HttpClientTestingModule, HttpTestingController } 
  from '@angular/common/http/testing';

describe('GetService testing', () => {
  let injector: TestBed;
  let getService: GetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ GetService ]
    });

    // inject http service and test controller for each test
    injector = getTestBed();
    getService = injector.get(GetService);
    httpMock = injector.get(HttpTestingController);
  });

  /* 
    run verify() to make sure that there are no outstanding requests
    afterEach(() => {
      httpMock.verify();
    });
  */

  describe('getCoordinates()', () => {
    
    it('should return an Observable<>', () => {
      let testAddress = 'Washington,DC';

      const mockResponse = {  
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

      getService.getCoordinates(testAddress)
        .subscribe(res => {
          expect(res).toContain(mockResponse);
          /* test latitude */
          expect(res['results'][0].locations[0].latLng.lat).toEqual(38.892062);
          /* test longitude */
          expect(res['results'][0].locations[0].latLng.lng).toEqual(-77.019912);
        });
    });

    it('should not made a request for invalid input', () => {
      let invalidAddress = '.';
      let mockUrl = `http://open.mapquestapi.com/geocoding/v1/address?key=${KEY}&location=${invalidAddress}&maxResults=1`;
      getService.getCoordinates(invalidAddress)
        .subscribe( () => {});
      
      /* httpMock.expectNone(mockUrl); */
    });
  });
});
