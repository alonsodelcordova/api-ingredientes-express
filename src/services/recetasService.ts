import { RecetaDto, RegistrarRecetaDto } from "../api/dto/recetasDto";
import * as recetaRepository from "../db/repository/receta_repository";
import * as mapperReceta from "../api/mappers/recetaMapper";
import { RecetaModel } from "../db/models/recetaModel";
import { eliminarImagenHelper } from "../helpers/fileHelpers";

export const registrarReceta = async (
  receta: RegistrarRecetaDto
): Promise<RecetaDto> => {
  const recetaModel: RecetaModel = mapperReceta.toRecetaInput(receta);
  const reponseModel = await recetaRepository.registrarRecetaRepository(
    recetaModel
  );
  return mapperReceta.toReceta(reponseModel);
};

export const getReceta = async (id: number): Promise<RecetaDto> => {
  const data = await recetaRepository.getRecetaByIdRepository(id);
  if (!data) {
    throw new Error("Receta no encontrada");
  }
  return mapperReceta.toReceta(data);
};


export const deleteReceta = async (id: number): Promise<boolean> => {

  const receta = await recetaRepository.existeRecetaRepository(id);
  if(!receta){
    throw new Error("Receta no encontrada");
  }
  return await recetaRepository.deleteRecetaRepository(id);
};


export const updateFotoReceta = async (
  id: number,
  foto: string
): Promise<boolean> => {
  const receta = await recetaRepository.getRecetaByIdRepository(id);
  if(!receta){
    throw new Error("Receta no encontrada");
  }
  if(receta.image){
    eliminarImagenHelper(receta.image);
  }
  const result = await recetaRepository.updateFotoRecetaRepository(id, foto);
  if(!result){
    throw new Error("Error al actualizar la foto");
  }
  return result;
}
