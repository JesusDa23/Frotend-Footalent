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
    const userInfo = this.getUserInfo()
    const vehicleD = this.vehicleData
    const submissionTime = this.getSubmissionTime()
    
    const dataToSend = {
      user: userInfo,  // Assuming userData is stored similarly
      vehicle: vehicleD,  // Include vehicle data
      sections: submissionData, // Collected form data
      submissionTime: submissionTime, // Add the submission time
      submissionType: "dailycheck"
    };
    
    // Check for required bullets
    const hasRequiredUnchecked = this.checkRequiredBullets();

    if (hasRequiredUnchecked) {
      // Ask user if the vehicle is drivable
      this.askVehicleDrivable().then((isDrivable) => {
        if (isDrivable) {
          console.log("Data to be sent:", dataToSend);  // Debug log
          this.saveData(dataToSend);
        } else {
          this.router.navigate(['/not-drivable']); // Navigate if not drivable
        }
      });
    } else {
      // Proceed to save if no required bullets are unchecked
      console.log("Data to be sent:", dataToSend);  // Debug log
      this.saveData(dataToSend);
    }
  } else {
    console.log('Form Status:', this.bulletsForm.status);
    console.log('Vehicle Data:', this.vehicleData);
    console.log('Form is invalid or vehicle data is missing');
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
    
    console.log("Submission Data Structure:", submissionData); // Log the structure of submission data
    
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
      title: 'Vehicle Drivable?',
      text: 'Some required checks are not completed. Is the vehicle drivable?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => result.isConfirmed);
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
