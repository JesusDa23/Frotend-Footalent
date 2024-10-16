import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { AdmincheckService } from '../../../Services/admincheck.service';
import { FlotaService } from '../../../Services/flota.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Section } from '../../models/section.model';
import { Bullet } from '../../models/bullet.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInfo } from '../../../Interfaces/credentials';
import { UserServiceService } from '../../../Services/user-service.service';
import Swal from 'sweetalert2'
import { SectionData } from '../../models/checklist.model';
import { TogglemenuComponent } from "../../togglemenu/togglemenu.component";
import { Alert, AlertService } from '../../../Services/alert.service';


@Component({
  selector: 'app-sections-by-cat',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TogglemenuComponent],
  templateUrl: './sections-by-cat.component.html',
  styleUrl: './sections-by-cat.component.css'
})
export class SectionsByCatComponent {
  
  categories: any[] = [];
  categoryId: string | null = null;
  vehicleId: string | null = null; 
  sections: Section[] = [];
  vehicleData: any
  selectedBullets: Bullet[] = [];
  openSectionId: string | null = null;
  bulletsForm!: FormGroup;
  
  
  constructor(
    
    private admincheckService: AdmincheckService , 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private FlotaService: FlotaService,
    private userService: UserServiceService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
      this.vehicleId = params['vehicle'];
      console.log('Category:', this.categoryId);
      console.log('Vehicle:', this.vehicleId);
    });
    if (this.categoryId) {
      this.loadSections();
    }
    if (this.vehicleId) {
      this.getVehicleData(this.vehicleId);
    }
    this.bulletsForm = this.fb.group({});
      // Retrieve user information from sessionStorage
  const userInfo: UserInfo | null = this.getUserInfo();

  if (userInfo) {
    this.bulletsForm = this.fb.group({
      userName: [userInfo.name, Validators.required],
      userDni: [userInfo.dni, Validators.required],
      userEmail: [userInfo.email, Validators.required],
      vehicleId: [this.vehicleId, Validators.required],
      // Add other form controls as needed
    });
  } else {
    this.bulletsForm = this.fb.group({
      userName: ['', Validators.required],
      userDni: ['', Validators.required],
      userEmail: ['', Validators.required],
      vehicleId: [this.vehicleId, Validators.required],
      // Add other form controls as needed
    });
  }

  }

  loadSections(): void {
    this.admincheckService.getSectionsByCategory(this.categoryId!).subscribe(
      (data: Section[]) => {
        this.sections = data;
      },
      (error) => {
        console.error('Error loading sections:', error);
      }
    );
  }
  getVehicleData(id: any) {
    this.FlotaService.getFlotaById(id).subscribe(
      (data) => {
        this.vehicleData = data;  // Store the fetched vehicle data
        console.log('Fetched Vehicle Data:', this.vehicleData);  // Debug log
      },
      (error) => {
        console.error('Error fetching vehicle data:', error);
      }
    );
  }
  
  onSectionClick(sectionId: string): void {
    const section = this.sections.find(s => s._id === sectionId);
    if (section) {
      if (this.openSectionId === sectionId) {
        this.openSectionId = null; // Close section
      } else {
        this.openSectionId = sectionId; // Open section
      }

      // Fetch bullets if not already loaded
      if (!section.bullets || section.bullets.length === 0) {
        this.admincheckService.getBulletsBySection(sectionId).subscribe(
          (bullets: Bullet[]) => {
            section.bullets = bullets;

            // Add a form control for each bullet
            bullets.forEach(bullet => {
              this.bulletsForm.addControl(
                `bullet_${bullet._id}`,
                this.fb.control(false)
              );
            });
          },
          (error) => {
            console.error('Failed to load bullets', error);
          }
        );
      }
    }
  }
 

  private getUserInfo(): UserInfo | null {
    const userInfo = sessionStorage.getItem('userInfo');
    // console.log("que es esto:",userInfo)
    return userInfo ? JSON.parse(userInfo) : null;
  }
  
  // Toggle the bullet value on click
  toggleBullet(bulletId: string): void {
    const control = this.bulletsForm.get(`bullet_${bulletId}`);
    if (control) {
      control.setValue(!control.value); // Toggle the value (true/false)
    }
  }
  // Method to check if the section is open
  isSectionOpen(sectionId: string): boolean {
    return this.openSectionId === sectionId;
  }
  
  
  // Submit form
  onSubmit(): void {
    if (this.bulletsForm.valid && this.vehicleData) {
      const submissionData = this.collectSubmissionData();
      const userInfo = this.getUserInfo();
      const vehicleD = this.vehicleData;
      const submissionTime = this.getSubmissionTime();
  
      const dataToSend = {
        user: userInfo,
        vehicle: vehicleD,
        sections: submissionData,
        submissionTime: submissionTime,
        submissionType: "dailycheck"
      };
  
      const hasRequiredUnchecked = this.checkRequiredBullets();
  
      if (hasRequiredUnchecked) {
        // Ask user if the vehicle is drivable
        this.askVehicleDrivable().then((isDrivable) => {
          if (isDrivable) {
            this.saveData(dataToSend);  // Save if drivable
            this.updateVehicleStatus(vehicleD._id, 'Ocupado');
          } else {
            this.updateVehicleStatus(vehicleD._id, 'Ocupado');
            this.router.navigate(['/reporte']);  // Navigate to report page if not drivable
          }
        });
      } else {
        Swal.fire({
          title: 'Bien!',
          text: 'Formulado enviado exitosamente!',
          icon: 'success',
          confirmButtonColor: '#0A135D'
        });
        this.router.navigate(['/homec']);
        this.saveData(dataToSend);  // Save data directly if no required bullets are unchecked
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'El formulario no es válido o falta información del vehículo.',
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    }
  }
  


 // Collect data for submission
  private collectSubmissionData(): SectionData[] {
    const submissionData: SectionData[] = []; // Use SectionData[] as the type

    this.sections.forEach(section => {
      const sectionData: SectionData = {
        sectionName: section.name,
        bullets: []
      };

      section.bullets!.forEach(bullet => {
        const control = this.bulletsForm.get(`bullet_${bullet._id}`);
        console.log(`Bullet Control (${bullet.description}):`, control?.value); // Log each bullet control value
        
        if (control) {
          sectionData.bullets.push({
            bulletName: bullet.description,
            response: control.value // true or false based on the toggle
          });
        }
      });

      if (sectionData.bullets.length > 0) {
        submissionData.push(sectionData);
      }
    });
    

    return submissionData;
  }

  // Separate function for submission time (to handle timestamps for each submission)
  private getSubmissionTime(): string {
    return new Date().toISOString();  // Generate the submission timestamp
  }

  // Check for required bullets that are unchecked
  private checkRequiredBullets(): boolean {
    return this.sections.some(section => 
      section.bullets!.some(bullet => bullet.requerido && !this.bulletsForm.get(`bullet_${bullet._id}`)?.value)
    );
  }
  
  // Ask user if the vehicle is drivable
  private askVehicleDrivable(): Promise<boolean> {
    return Swal.fire({
      title: 'Conducible?',
      text: 'Algunos puntos son requeridos. El vehículo se puede conducir?',
      icon: 'warning',
      background: "#fff",
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Reportar',
      confirmButtonColor: '#0A135D',
      cancelButtonColor: '#A22B2B'
    }).then((result) => {
      if (result.isConfirmed) {
        return Swal.fire({
          title: "Enviado!",
          text: "Formulario enviado correctamente.",
          icon: "success",
          confirmButtonColor: '#0A135D'
        }).then(() => {
          this.router.navigate(['/homec']);  // Redirect to home after confirmation
          return true;  // Return true to signal that form was confirmed and submitted
        });
      } else {
        return Swal.fire({
          title: "Reporte",
          text: "El vehículo no es conducible. Reportando...",
          icon: "info",
          confirmButtonColor: '#A22B2B'
        }).then(() => false);  // Return false if "Reportar" is clicked
      }
    });
  }
  
  
  private updateVehicleStatus(vehicleId: number, status: string): void {
    const data = { status: status };  // Define the status update payload
  
    this.FlotaService.updateFlotas(vehicleId, data).subscribe(
      (response) => {
        console.log(`Vehicle status updated to ${status}:`, response);
      },
      (error) => {
        console.error('Failed to update vehicle status:', error);
      }
    );
  }
  

  // Save data to the backend
  private saveData(data: any): void {
  console.log('Data to be sent:', JSON.stringify(data, null, 2)); // Log the data being sent to the backend
  
  this.userService.saveInspectionData(data).subscribe(
    (response) => {
      console.log('Data saved successfully:', response);
      // Optionally, navigate or reset the form after successful submission
    },
    (error) => {
      console.error('Failed to save data:', error);
    }
  );
  }

  goBack(): void {
    this.location.back();
  }



}
