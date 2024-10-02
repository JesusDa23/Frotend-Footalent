// checklist.model.ts (create this file to define your models)
export interface ChecklistData {
    sistemaLuces: { [key: string]: boolean };
    estadoCubiertas: { [key: string]: boolean };
    tapasYOtros: { [key: string]: boolean };
    accesoriosSeguridad: { [key: string]: boolean };
    parteExterna: { [key: string]: boolean };
    parteInterna: { [key: string]: boolean };
    documentacion: { [key: string]: boolean };
  }
  
  export class Checklist {
    tipoVehiculo?: string;
    area?: string;
    placa?: string;
    conductor?: string;
    empresa?: string;
    fecha?: Date;
    horaInspeccion?: string;
    kmInicial?: number;
    kmFinal?: number;
    TipoConsumo?: string;
    AsientoTrasero?: boolean;
    sistemaLuces?: any;
    parteExterna?: any;
    parteInterna?: any;
    estadoCubiertas?: any;
    accesoriosSeguridad?: any;
    tapasyOtros?: any;
    documentacion?: any;
    observaciones?: string;
    choquesYRaspaduras?: string;
    afirmacion?: boolean;
  }
  

  export class Checklistreport {
    fecha?: Date;
    descripcion?: string;
    pasajeros?: number;
    detalles?: string;
  }
  