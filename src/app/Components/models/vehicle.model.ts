export interface Vehicle {
    id: any;
    make: string;
    model: string;
    year: number;
    vin: string;
    plate: string;
    color?: string;
    mileage?: number;
    owner?: string;
    status: 'available' | 'sold' | 'maintenance';
    createdAt?: Date;
  }
  