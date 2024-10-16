import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { AdmincheckService } from '../../../Services/admincheck.service';
import { AccountsService } from '../../../Services/accounts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TogglemenuComponent } from "../../togglemenu/togglemenu.component";

@Component({
  selector: 'app-formresponses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TogglemenuComponent],
  templateUrl: './formresponses.component.html',
  styleUrl: './formresponses.component.css'
})
export class FormresponsesComponent {
  inspectionForms: any[] = [];  // Para almacenar los formularios obtenidos
  loading: boolean = true;
  expandedFormIndex: number | null = null;
  searchTerm: string = '';
  filteredForms: any[] = [];  // Inicializar como un array vacío

  constructor(private inspectionService: AdmincheckService, private accountsService: AccountsService, private location: Location) {}

  ngOnInit(): void {
    this.accountsService.isAdmin();
    this.retrieveForms(); // Obtener formularios al cargar el componente
  }

  retrieveForms() {
    this.inspectionService.getInspectionForms().subscribe({
      next: (data) => {
        this.inspectionForms = data;  // Asignar los datos de la API a inspectionForms
        this.filteredForms = [...this.inspectionForms]; // Inicializar filteredForms con todos los formularios
        this.loading = false;
      },
      error: (error) => {
        // Manejar error al obtener datos
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
        form.vehicle.model.toLowerCase().includes(term) ||
        form.vehicle.plate.toLowerCase().includes(term)
      );
    } else {
      // Resetear a todos los formularios si no se proporciona un término de búsqueda
      this.filteredForms = [...this.inspectionForms];
    }
  }

  toggleForm(index: number): void {
    this.expandedFormIndex = this.expandedFormIndex === index ? null : index;
  }

  toggleSection(form: any, sectionIndex: number): void {
    form.sections[sectionIndex].expanded = !form.sections[sectionIndex].expanded;
  }

  downloadSelectedForms() {
    const doc = new jsPDF();
    const selectedForms = this.filteredForms.filter(form => form.selected);
  
    if (selectedForms.length === 0) {
        alert('Por favor, selecciona al menos un formulario.');
        return;
    }
  
    selectedForms.forEach((form, index) => {
        if (index > 0) {
            doc.addPage(); // Añadir nueva página para cada formulario
        }
        doc.text(`Formulario de Inspección para ${form.user.name}`, 10, 10);
  
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
  
        if (form.sections && form.sections.length > 0) {
          form.sections.forEach((section: any, sectionIndex: number) => {
              const previousY = (doc as any).lastAutoTable.finalY; // Guardar la posición final de la última tabla
              doc.text(`Sección ${sectionIndex + 1}: ${section.sectionName}`, 10, previousY + 10);
              autoTable(doc, {
                  head: [['Nombre del Bullet', 'Respuesta']],
                  body: section.bullets.map((bullet: any) => [
                      bullet.bulletName,
                      bullet.response ? 'Sí' : 'No'
                  ]),
                  startY: previousY + 20 // Ajustar la posición vertical con base en la tabla anterior
              });
          });
        }
    });
  
    // Guardar el PDF
    doc.save('formularios_inspeccion.pdf');
  }



  goBack(): void {
    this.location.back();
  }

  // Función para seleccionar/desmarcar todos los checkboxes
  toggleAll(event: any) {
    const checked = event.target.checked;
    this.filteredForms.forEach(form => form.selected = checked);
  }

}
