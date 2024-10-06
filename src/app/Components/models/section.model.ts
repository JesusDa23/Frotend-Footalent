import { Bullet } from "./bullet.model";

export interface Section {
    _id?: string;
    name: string;
    bullets?: Bullet[];
    category: string; // categoryId
  }
  
