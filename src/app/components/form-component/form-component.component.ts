import { Component, OnInit } from '@angular/core';
import { GetService } from '../../services/get-service.service';

@Component({
  selector: 'form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponent implements OnInit {

  latitude: number;
  longitude: number;
  notValid: boolean;

  constructor(private getService: GetService) { }

  ngOnInit() {}

  submit(address) {
    if(/^[0-9a-zA-Z].{1,}/.test(address)) {
      this.getService.getCoordinates(address).subscribe(res => {
        this.latitude = res.results[0].locations[0].latLng.lat;
        this.longitude = res.results[0].locations[0].latLng.lng;
      });
      this.notValid = false;
    } else {
      this.notValid = true;
      this.latitude = null;
      this.longitude = null;
    }
  }

}
