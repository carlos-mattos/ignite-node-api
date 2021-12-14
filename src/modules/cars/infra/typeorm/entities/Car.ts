import { v4 as uuid } from "uuid";

export default class Car {
  id?: string;

  name: string;

  description: string;

  daily_rate: number;

  license_plate: string;

  fine_amount: number;

  brand: string;

  available: boolean;

  category_id: string;

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.available = true;
      this.created_at = new Date();
    }
  }
}
