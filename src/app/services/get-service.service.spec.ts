import { TestBed, inject } from '@angular/core/testing';
import { 
  HttpModule, 
  Http,
  XHRBackend,
  Response,
  ResponseOptions 
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { GetService } from './get-service.service';


describe('GetService', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        GetService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  describe('getCoordinates()', () => {
    
    let address = 'Washington,DC';

    it('should return an Observable<Response>', 
      
      inject([ GetService, XHRBackend ], (getService, mockBackend) => {
        
        mockBackend.connections.subscribe((connection) => {
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

          mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })));
          });
          
        });

        getService.getCoordinates(address).subscribe((res) => {
          /* test latitude */
          expect(res.results[0].locations[0].latLng.lat).toEqual(38.892062);
          /* test longitude */
          expect(res.results[0].locations[0].latLng.lng).toEqual(-77.019912);
        });
      })
    );
  });
});
