import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccesoriosSeguridadComponent } from './inspectionforms/accesorios-seguridad/accesorios-seguridad.component';
import { SistemadelucesComponent } from './inspectionforms/sistemadeluces/sistemadeluces.component';
import { DocumentacionComponent } from './inspectionforms/documentacion/documentacion.component';
import { EstadoCubiertasComponent } from './inspectionforms/estado-cubiertas/estado-cubiertas.component';
import { ParteExternaComponent } from './inspectionforms/parte-externa/parte-externa.component';
import { ParteInternaComponent } from './inspectionforms/parte-interna/parte-interna.component';
import { TapasyOtrosComponent } from './inspectionforms/tapasy-otros/tapasy-otros.component';
import { ChecklistService } from '../../../Services/checklist.service';
import { FormdataserviceService } from '../../../Services/formdataservice.service';
import { Checklist } from '../../models/checklist.model';



@Component({
  selector: 'app-inspeccion',
  standalone: true,
  imports: [
    
    AccesoriosSeguridadComponent,
    CommonModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    SistemadelucesComponent,
    DocumentacionComponent,
    EstadoCubiertasComponent,
    ParteExternaComponent,
    ParteInternaComponent,
    TapasyOtrosComponent,
  ],
  templateUrl: './inspeccion.component.html',
  styleUrl: './inspeccion.component.css'
})
export class InspeccionComponent {

  checklist: Checklist = new Checklist();

  checklistData: any = {
    sistemaLuces: {},
    estadoCubiertas: {},
    tapasYOtros: {},
    accesoriosSeguridad: {},
    parteExterna: {},
    parteInterna: {},
    documentacion: {}
  };

  @ViewChild(SistemadelucesComponent) SistemadelucesComponent!: SistemadelucesComponent;
  @ViewChild(EstadoCubiertasComponent) estadoCubiertasComponent!: EstadoCubiertasComponent;
  @ViewChild(TapasyOtrosComponent) tapasYOtrosComponent!: TapasyOtrosComponent;
  @ViewChild(AccesoriosSeguridadComponent) accesoriosSeguridadComponent!: AccesoriosSeguridadComponent;
  @ViewChild(ParteExternaComponent) parteExternaComponent!: ParteExternaComponent;
  @ViewChild(ParteInternaComponent) parteInternaComponent!: ParteInternaComponent;
  @ViewChild(DocumentacionComponent) DocumentacionComponent!: DocumentacionComponent;

  ngOnInit(): void {
  //   const savedData = this.formDataService.getFormData();
  // this.SistemadelucesComponent.populate(savedData.sistemaLuces);


  }

  currentSection: number = 0;
  totalSections: number = 7;

  constructor(private checklistService: ChecklistService, private formDataService: FormdataserviceService) {
    
  }
  // Go to a specific section
  goToSection(section: number) {
    this.currentSection = section;
  }
  isLastSection(): boolean {
    return this.currentSection === this.totalSections - 1;
  }

  // Navigate to the next section
  nextSection() {
    // this.formDataService.setFormData({
    //   ...this.formDataService.getFormData(),
    //   sistemaLuces: this.SistemadelucesComponent.getData(),
    // });


    switch (this.currentSection) {
      case 0:
        this.checklistData.sistemaLuces = this.SistemadelucesComponent.getSistemaLucesData();
        break;
      case 1:
        this.checklistData.estadoCubiertas = this.estadoCubiertasComponent.getEstadoCubiertasData();
        break;
      case 2:
        this.checklistData.tapasYOtros = this.tapasYOtrosComponent.getTapasYOtrosData();
        break;
      case 3:
        this.checklistData.accesoriosSeguridad = this.accesoriosSeguridadComponent.getAccesoriosSeguridadData();
        break;
      case 4:
        this.checklistData.parteExterna = this.parteExternaComponent.getParteExternaData();
        break;
      case 5:
        this.checklistData.parteInterna = this.parteInternaComponent.getParteInternaData();
        break;
      case 6:
        this.checklistData.documentacion = this.DocumentacionComponent.getDocumentacionData();
        break;
    }
    if (this.currentSection < 6) {
      this.currentSection++;
    } else {
      this.submitForm();
    }
  }

  // Navigate to the previous section
  previousSection() {
    if (this.currentSection > 0) {
      this.currentSection--;
    }
  }

  submitForm() {
    this.createChecklist();
    const finalData = this.checklistService.getChecklistData();
    console.log("Final form data:", this.checklistData);
    console.log(finalData); // You can log or send this to the server
    
  }

  createChecklist(): void {
    this.checklistService.createChecklist(this.checklist).subscribe({
      next: (response: Checklist) => {
        console.log('Checklist created successfully:', response);
        // Handle successful response, maybe reset form or show a success message
      },
      error: (error: any) => {
        console.error('Error creating checklist:', error);
        // Handle error, show error message, etc.
      }
    });
  }
  
}
