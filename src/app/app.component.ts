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
    let html = `
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

    html = ` <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Consent Document</title>
      <style>
        * {
          font-family: sans-serif;
          font-size: 8px !important;
        }
        @media print {
          @page {
            size: auto;
            margin: 0.3in;
          }
        }
        .box {
          border: 1px solid black;
          padding: 1%;
        }
        .heading {
          text-align: center;
          /* font-size: 20px; */
          font-weight: bold;
        }
        .sub-heading {
          text-align: center;
          /* font-size: 18px; */
        }
        hr {
          border: 1px solid black;
        }
        .warning {
          color: red;
          font-weight: bold;
        }
        table {
          width: 100%;
          border: 2px !important;
          border-spacing: 0;
          margin: 0px auto;
          border-collapse: collapse;
          border-spacing: 0;
        }
        td {
          border-color: black;
          border-style: solid;
          border-width: 1px;
          /* font-size: 14px; */
          overflow: hidden;
          padding: 10px;
          word-break: break-all;
          white-space: normal;
          /* text-overflow: ellipsis; */
        }
        .third-table-instruction {
          width: 10%;
        }
        .third-table-data {
          width: 30%;
        }
        .fourth-table-instruction {
          width: 10%;
        }
        .fourth-table-data {
          width: 60%;
        }
        .first-table-instruction {
          width: 0%;
        }
        .first-table-first-instruction {
          width: 5%;
        }
        .first-table-first-data {
          width: 15%;
        }
        .first-table-second-instruction {
          width: 5%;
        }
        .first-table-second-data {
          width: 15%;
        }
        .first-table-third-instruction {
          width: 5%;
        }
        .first-table-third-data {
          width: 20%;
        }
        .first-table-fourth-instruction {
          width: 5%;
        }
        .first-table-fourth-data {
          width: 10%;
        }
        .d-flex {
          display: flex;
          align-items: center;
        }
        label {
          margin: 0px 5px;
        }
        .vertical-text {
          text-align: center;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      </style>
    </head>
    <body>
      <main>
        <header>
          <h2 class="heading">Program</h2>
          <h2 class="heading">Consent Form</h2>
          <p class="sub-heading">
            In conjunction with.
            <br />
            It will be reviewed.
          </p>
          <br />
          <hr />
          <p class="warning">* THIS FORM MUST BE SIGNED *</p>
        </header>

        <section class="">
          <!-- First table -->
          <table>
            <table>
              <tbody>
                <tr>
                  <td rowspan="3" class="vertical-text first-table-instruction">
                    E Information
                  </td>
                  <td class="first-table-first-instruction">Name:</td>
                  <td class="first-table-first-data">
                    Test Name Test Name Test Name Test Name Test Name Test Name
                  </td>
                  <td class="first-table-second-instruction">Number:</td>
                  <td class="first-table-second-instruction" colspan="2">
                    0987654321
                  </td>
                  <td class="first-table-third-instruction">Tele:</td>
                  <td class="first-table-third-instruction" colspan="2">
                    +0987654321
                  </td>
                </tr>
                <tr>
                  <td colspan="8">
                    Note: The information provided will be used to contact you.
                  </td>
                </tr>
                <tr>
                  <td class="first-table-first-instruction">No:</td>
                  <td class="first-table-first-data">ABCDEFGHIJ0987654321</td>
                  <td class="first-table-second-instruction">Exp:</td>
                  <td class="first-table-second-instruction">12/12/2024</td>
                  <td class="first-table-third-instruction">State:</td>
                  <td class="first-table-third-instruction">
                    ABCDEFGHIJKLMNOPQ RSTUVXYZ
                  </td>
                  <td class="first-table-fourth-instruction">Birth Date:</td>
                  <td class="first-table-fourth-instruction">99/99/9999</td>
                </tr>
              </tbody>
            </table>
          </table>
          <br />

          <!-- First table -->
          <table>
            <tbody>
              <tr>
                <td rowspan="2" class="vertical-text first-table-instruction">
                  D Information
                </td>
                <td class="first-table-first-instruction">Name:</td>
                <td class="first-table-first-data"></td>
                <td colspan="3" class="first-table-first-instruction">
                  Relationship:
                </td>
                <td colspan="3" class="first-table-first-data"></td>
              </tr>
              <tr>
                <td class="first-table-first-instruction">No:</td>
                <td class="first-table-first-data"></td>
                <td class="first-table-second-instruction">Exp:</td>
                <td class="first-table-second-instruction"></td>
                <td class="first-table-third-instruction">State:</td>
                <td class="first-table-third-instruction"></td>
                <td class="first-table-fourth-instruction">Birth Date:</td>
                <td class="first-table-fourth-instruction"></td>
              </tr>
            </tbody>
          </table>
          <br />

          <!-- Second table -->
          <table>
            <tbody>
              <tr>
                <td class="vertical-text">Authorization for associates</td>
                <td class="">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Modi, suscipit harum odio quia repellendus saepe a placeat ex
                  illum maxime delectus iste commodi, quaerat quas ipsam numquam
                  inventore iure? Autem? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Quo sapiente non quibusdam quidem amet
                  consequatur odio autem, nostrum laudantium ex doloremque
                  cupiditate accusamus facere adipisci dignissimos praesentium
                  possimus minus vitae! Provident nemo ullam, expedita in vitae
                  maxime voluptatem deleniti temporibus fuga soluta dolorum
                  dolor, error veritatis quibusdam architecto omnis. Repellat
                  illum eaque vel eligendi accusantium ipsam, deleniti mollitia
                  cum obcaecati porro dolore error alias et placeat laudantium
                  nihil excepturi, consectetur ut ratione nulla, veniam
                  exercitationem ipsum. Magni vero temporibus pariatur doloribus
                  velit recusandae tenetur aliquam explicabo molestias. Tenetur
                  blanditiis voluptates labore harum soluta nisi, esse, expedita
                  sequi dicta possimus suscipit? Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Quam quibusdam suscipit, beatae
                  hic veritatis deserunt nihil iusto facere? Rem harum dolore
                  illo architecto deleniti cum alias sequi, quisquam ea, fugit
                  quibusdam nisi perspiciatis repudiandae ex quasi non enim
                  rerum? Iste hic unde sint a impedit iusto architecto ad harum
                  eveniet temporibus soluta, tenetur quibusdam possimus illum
                  suscipit voluptate accusantium asperiores nostrum eius
                  mollitia beatae corporis itaque? Est vel ipsam voluptatibus
                  iste alias animi aspernatur repellendus error sequi, molestiae
                  dolorum blanditiis vitae ipsa consequuntur corrupti voluptates
                  consequatur minima qui soluta dignissimos distinctio nihil
                  omnis tempora! Et minima illum quis possimus ipsa laboriosam
                  temporibus quos, rem quisquam sapiente neque, quasi, natus
                  praesentium at porro dolorem! Quaerat dolore corrupti corporis
                  nam quis blanditiis, nobis modi voluptate dolores temporibus
                  ex praesentium fugit distinctio dolorem placeat totam at
                  deserunt laborum porro omnis deleniti! Aliquid quis rerum
                  distinctio numquam ab magnam labore similique voluptas rem
                  aspernatur itaque fugiat temporibus reiciendis nihil
                  laudantium, accusantium dignissimos cum. Nam nesciunt unde
                  dignissimos deleniti vero quisquam quae explicabo, amet totam!
                  Consectetur consequatur dolores neque earum quis, corporis
                  eveniet laudantium eligendi, necessitatibus nemo velit aperiam
                  asperiores reprehenderit temporibus ut deleniti expedita enim!
                  Quisquam enim sunt consequatur quae facere veniam asperiores
                  nemo.
                </td>
              </tr>
            </tbody>
          </table>
          <br />

          <!-- Third table -->
          <table>
            <tbody>
              <tr>
                <td rowspan="2" class="third-table-instruction">Location:</td>
                <td class="third-table-data">
                  <div class="d-flex">
                    <input type="checkbox" />
                    <label>Location 1</label>
                  </div>
                </td>
                <td class="third-table-data">
                  <div class="d-flex">
                    <input type="checkbox" />
                    <label>Location 2</label>
                  </div>
                </td>
                <td class="third-table-data">
                  <div class="d-flex">
                    <input type="checkbox" />
                    <label>Location 3</label>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="third-table-data">
                  <div class="d-flex">
                    <input type="checkbox" />
                    <label>Location 4</label>
                  </div>
                </td>
                <td class="third-table-data">
                  <div class="d-flex">
                    <label>V:</label>
                  </div>
                </td>
                <td class="third-table-data">
                  <div class="d-flex">
                    <label>Name:</label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <br />

          <p>
            Agrees,
            <u u>in writing, if revoked.</u>
            In consideration by signing below,
          </p>
          <br />

          <!-- Fourth table -->
          <table class="fourth-table">
            <tbody>
              <tr>
                <td class="fourth-table-instruction">Signature:</td>
                <td class="fourth-table-data"></td>
                <td class="fourth-table-instruction">Date:</td>
                <td class="fourth-table-data"></td>
              </tr>
              <tr>
                <td class="fourth-table-instruction">
                  Signature: <br />
                  (if different)
                </td>
                <td class="fourth-table-data"></td>
                <td class="fourth-table-instruction">Date:</td>
                <td class="fourth-table-data"></td>
              </tr>
              <tr>
                <td class="fourth-table-instruction">Other Signature:</td>
                <td class="fourth-table-data"></td>
                <td class="fourth-table-instruction">Date:</td>
                <td class="fourth-table-data"></td>
              </tr>
            </tbody>
          </table>
        </section>
        <br />

        <footer>
          <p>Version 04/10/2024</p>
        </footer>
      </main>
    </body>
  </html>`;

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

  async onFileChange(event: any) {
    const fileSizeInMB = event.target.files[0].size / (1024 * 1024);
    this.data.file = event.target.files[0];

    if (fileSizeInMB > 2) {
      this.message = 'File size should be less than 2MB.';
      this.data.file = null;
      return;
    } else {
      this.message = '';
    }

    const base64String = await this.convertToBase64(this.data.file);
    console.log(base64String);
    console.log('123');
  }

  convertToBase64(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
}
