import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AmbienteService } from 'src/app/shared/service/ambiente.service';
import { Ambiente } from 'src/app/shared/model/ambiente';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QRCodeComponent implements OnInit {
  public qrCodeUrl: string = '';
  public ambiente: Ambiente;

  constructor(private route: ActivatedRoute, private http: HttpClient, private ambienteService: AmbienteService,) { }

  printQRCode(): void {
    window.print();
    setInterval(() => {
      window.close();
    }, 300);
  }

  ngOnInit(): void {
    this.ambienteService.consultarPorId(this.route.snapshot.params['id']).subscribe(
      (resultado) => {
        this.ambiente = resultado;
      }
    );
    // Fetch the id parameter from the route
    const id = this.route.snapshot.params['id'];

    // Construct the URL for QR code API
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=450x450&data=id:${id}`;

    // Make HTTP GET request to fetch the QR code image
    this.http.get(qrCodeApiUrl, { responseType: 'blob' }).subscribe((blob: Blob) => {
      // Convert Blob to a data URL
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        this.qrCodeUrl = reader.result as string;
      };
    });
    setTimeout(() => {
      this.printQRCode();
    }, 1000);
  }
}
