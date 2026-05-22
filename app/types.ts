export interface Caterer {
  id: string;
  name: string;
  location: string;
  pricePerPlate: number;
  cuisines: string[];
  rating: number;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
}
