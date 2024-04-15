import { Injectable } from '@angular/core';
import print from 'print-js';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  generatePdf(name: string, email: string, phone: string) {
    if (!name || !email || !phone) {
      return;
    }

    print({
      printable: 'generatedHtml',
      type: 'html',
      scanStyles: true,
      css: 'styles.css',
    });
  }
}
