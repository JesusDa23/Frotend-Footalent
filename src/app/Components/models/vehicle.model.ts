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
    category?: Category [];
  }
  
  export interface Category {
    _id?: string;
    name: string;
  }

  export interface vehicleData {
    make: string;
    model: string;
    year: number;
    licensePlate: string
  }