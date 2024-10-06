export interface Section {
    _id?: string;
    name: string;
    bullets?: Bullet[];
    category: string; // categoryId
  }
  
  export interface Bullet {
    _id?: string;
    description: string;
    code: string;
    section: string; // sectionId
  }