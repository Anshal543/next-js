export interface FormState {
  message?: string;
  errors?: {
    name?: string[];
    price?: string[];
    description?: string[];
    imageUrl?: string[];
    contactEmail?: string[];
  } | null;
  type?: "error" | "success" ;
}

