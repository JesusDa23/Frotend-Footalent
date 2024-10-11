import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { AdmincheckService } from '../../../Services/admincheck.service';
import { AccountsService } from '../../../Services/accounts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas'
import { TogglemenuComponent } from "../../togglemenu/togglemenu.component";

@Component({
  selector: 'app-formresponses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TogglemenuComponent],
  templateUrl: './formresponses.component.html',
  styleUrl: './formresponses.component.css'
})
export class FormresponsesComponent {
  inspectionForms: any[] = [];  // To hold the fetched forms
  loading: boolean = true;
  expandedFormIndex: number | null = null;
  searchTerm: string = '';
  filteredForms: any[] = [];  // Ensure it's an empty array initially

  constructor(private inspectionService: AdmincheckService, private accountsService: AccountsService, private location: Location) {}

  ngOnInit(): void {
    this.accountsService.isAdmin();

    this.retrieveForms(); // Fetch forms when the component loads
  }

  retrieveForms() {
    this.inspectionService.getInspectionForms().subscribe({
      next: (data) => {
        this.inspectionForms = data;  // Assign data from API to inspectionForms
        this.filteredForms = [...this.inspectionForms]; // Initialize filteredForms with all forms
        this.loading = false;
      },
      error: (error) => {
        // Handle error while fetching data
        console.error('Error fetching inspection forms:', error);
        this.loading = false;
      }
    });
  }

  searchForms() {
    const term = this.searchTerm.toLowerCase().trim();
    if (term) {
      this.filteredForms = this.inspectionForms.filter(form =>
        form.user.name.toLowerCase().includes(term) ||
        form.user.dni.toLowerCase().includes(term) ||
        form.vehicle.make.toLowerCase().includes(term) ||
        form.vehicle.model.toLowerCase().includes(term)
      );
    } else {
      // Reset to all forms if no search term is provided
      this.filteredForms = [...this.inspectionForms];
    }
  }

  toggleForm(index: number): void {
    this.expandedFormIndex = this.expandedFormIndex === index ? null : index;
  }

  toggleSection(form: any, sectionIndex: number): void {
    form.sections[sectionIndex].expanded = !form.sections[sectionIndex].expanded;
  }

  // PDF Generation for a specific form
  generatePDF(form: any) {
    // const doc = new jsPDF();
  
    // // Add title
    // doc.text(`Inspection Form for ${form.user.name}`, 10, 10);
    // doc.setFontSize(12);
  
    // // Add form data (Conductor, DNI, etc.)
    // doc.autoTable({
    //   head: [['Conductor', 'DNI', 'Email', 'Fecha', 'Vehicle Make', 'Modelo', 'Placa']],
    //   body: [[
    //     form.user.name,
    //     form.user.dni,
    //     form.user.email,
    //     new Date(form.submissionTime).toLocaleDateString(),
    //     form.vehicle.make,
    //     form.vehicle.model,
    //     form.vehicle.plate
    //   ]],
    //   startY: 20
    // });
  
        // Agregar los datos del formulario al PDF usando autoTable
        autoTable(doc, {
            head: [['Conductor', 'DNI', 'Email', 'Fecha', 'Marca', 'Modelo', 'Placa']],
            body: [[
                form.user.name,
                form.user.dni,
                form.user.email,
                new Date(form.submissionTime).toLocaleDateString(),
                form.vehicle.make,
                form.vehicle.model,
                form.vehicle.plate   
            ]],
            startY: 20 // Ajusta la posición vertical
        });
    
    // // Add sections if available
    // if (form.sections && form.sections.length > 0) {
    //   form.sections.forEach((section: any, index: number) => {
    //     doc.text(`Section ${index + 1}: ${section.sectionName}`, 10, doc.autoTable.previous.finalY + 10);
    //     doc.autoTable({
    //       head: [['Bullet Name', 'Response']],
    //       body: section.bullets.map((bullet: any) => [
    //         bullet.bulletName,
    //         bullet.response ? 'Yes' : 'No'
    //       ]),
    //       startY: doc.autoTable.previous.finalY + 20
    //     });
    //   });
    // }
  
    // // Save the PDF with the form's user name as the file name
    // doc.save(`${form.user.name}-inspection-form.pdf`);
  }

  goBack(): void {
    this.location.back();
  }
  

}
