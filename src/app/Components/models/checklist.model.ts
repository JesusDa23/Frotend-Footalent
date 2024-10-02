export interface Checklist {
    id?: string;  // Optional for new checklists, as it will be generated by the server
    title: string;
    items: string[];
    status: string;
  }
  
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
  