import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { PdfService } from './services/pdf.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'fill-form-test';

  data = {
    name: '',
    email: '',
    phone: '',
    file: null,
  };

  message = '';
  showHtmlForPdf = true;

  @ViewChild('generatedHtml', { static: false }) generatedHtml:
    | ElementRef
    | undefined;

  ngAfterViewInit() {
    if (this.generatedHtml) {
      console.log(this.generatedHtml.nativeElement);
    }
  }

  constructor(private pdfService: PdfService) {}
  ngOnInit() {
    const pdfUrl = '../assets/sample.pdf';
    this.fillData();
  }

  fillData() {
    this.data.name = 'John Doe';
    this.data.email = 'john.doe@email.com';
    this.data.phone = '1234567890';
  }

  generate() {
    if (!this.data.name || !this.data.email || !this.data.phone) {
      this.message = 'Please fill all the fields.';
      return;
    }
    this.message = '';
    this.createHtml();
    this.pdfService.generatePdf(
      this.data.name,
      this.data.email,
      this.data.phone
    );
  }

  createHtml() {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Document</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        @media print {
            @page {
                size: auto;
                margin: 0.3in;
            }
        }
    </style>
</head>
<body>
    <section class="document-section">
        <div class="header">
            <h1 class="document-title">Definitely A Legal Document</h1>
            <img class="logo" src="../assets/car.png" alt="" />
        </div>
        <br />
        <hr class="divider" />
        <br />
        <main class="content">
            <p>
                This sample document is brewed with 10,000% legality on the server. Therefore, I, <span class="highlight">${
                  this.data.name
                }</span>, agree to disagree to be responsible for any consequences caused by my actions. I cannot be found via email at <span class="highlight">${
      this.data.email
    }</span> or via phone at <span class="highlight">${
      this.data.phone
    }</span>. As for signing this document, well, let's just say my evil twin was upto some mischief.
            </p>
            <br />
            <p><span class="bold-text">Signature - </span></p>
            <p><span class="bold-text">Date - </span>${this.currentDateTime}</p>
        </main>
        <br />
        <hr class="divider" />
        <br />
        <footer class="footer">
            <div class="footer-content">
                <p class="copyright">&copy; ${new Date().getFullYear()}</p>
                <p class="company-name">Company Inc.</p>
            </div>
        </footer>
    </section>
</body>
</html>
  `;

    if (this.generatedHtml) {
      this.generatedHtml.nativeElement.innerHTML = html;
    }

    /** This opens in new tab */
    // this.openHTMLInNewTab(html);
  }

  get currentDateTime() {
    return new Date().toUTCString();
  }

  openHTMLInNewTab(html: string) {
    const win: any = window.open();
    win.document.body.innerHTML = html;
    win.print();
  }

  onFileChange(event: any) {
    const fileSizeInMB = event.target.files[0].size / (1024 * 1024);
    this.data.file = event.target.files[0];
    if (fileSizeInMB > 2) {
      this.message = 'File size should be less than 2MB.';
      this.data.file = null;
      return;
    } else {
      this.message = '';
    }
  }
}
