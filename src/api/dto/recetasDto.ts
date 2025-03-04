import { IngredientDto } from "./ingredient";



export interface RegistrarRecetaDto{
    name: string;
    slug: string;
    description: string;
    preparation: string;
    ingredientes: RegistrarIngredientDto[];
}

export interface RegistrarIngredientDto{
    ingredientId: number;
    quantity: number;
    unit: string;
    measure: string;
}


export interface RecetaDto{
    id?: number;
    name: string;
    slug: string;
    description?: string;
    preparation?: string;
    state?: number;
    imagen?: string;
    createdAt?: Date;
    updatedAt?: Date;
    ingredientes?: IngredientRecetaDto[];
}

export interface IngredientRecetaDto{
    id?: number;
    recetaId?: number;
    ingredientId: number;
    quantity: number;
    measure: string;
    unit: string;
    createdAt?: Date;
    updatedAt?: Date;
    ingredient?: IngredientDto;
}