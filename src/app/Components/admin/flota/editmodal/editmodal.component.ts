import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup,  Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Vehicle } from '../../../models/vehicle.model';

@Component({
  selector: 'app-editmodal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editmodal.component.html',
  styleUrl: './editmodal.component.css'
})
export class EditmodalComponent {
  @Input() vehicle!: Vehicle | null;  // Input from parent component
  @Output() vehicleUpdated = new EventEmitter<Vehicle>();  // Event to emit edited data
  @Output() vehicleCreated = new EventEmitter<Vehicle>()
  @Output() modalClosed = new EventEmitter<void>();
  vehicleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.vehicleForm = this.fb.group({
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      vin: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      color: [''],
      mileage: [0],
      owner: [''],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.vehicle) {
      // Patch form with the selected vehicle data
      this.vehicleForm.patchValue(this.vehicle);
    }
  }

  onSubmit() {
   if (this.vehicle) {
      // Emit the updated vehicle data
      this.vehicleUpdated.emit({ id: this.vehicle.id, ...this.vehicleForm.value });
    } else {
      // Emit the new vehicle data
      this.vehicleCreated.emit(this.vehicleForm.value);
    }
  }

  onCloseModal() {
    // Emit an event to notify parent to close the modal
    this.modalClosed.emit();
  }
}
