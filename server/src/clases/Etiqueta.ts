import Etiqueta from "../models/Etiqueta";
import TareaEtiqueta from "../models/TareaEtiqueta";

export class EtiquetaClass {
  // GET /api/etiquetas
  async obtenerTodas(organizacionId: number) {
    try {
      return await Etiqueta.findAll({
        where: { organizacion_id: organizacionId }
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener las etiquetas");
    }
  }

  // POST /api/etiquetas
  async crear(body: any) {
    try {
      const etiqueta = await Etiqueta.create(body);
      return { mensaje: "Etiqueta creada exitosamente", etiqueta };
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear la etiqueta");
    }
  }

  // PUT /api/etiquetas/:id
  async actualizar(id: number, body: any) {
    try {
      const etiqueta = await Etiqueta.findByPk(id);
      if (!etiqueta) {
        throw new Error("Etiqueta no encontrada");
      }
      await etiqueta.update(body);
      return { mensaje: "Etiqueta actualizada exitosamente", etiqueta };
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar la etiqueta");
    }
  }

  // DELETE /api/etiquetas/:id
  async eliminar(id: number) {
    try {
      const etiqueta = await Etiqueta.findByPk(id);
      if (!etiqueta) {
        throw new Error("Etiqueta no encontrada");
      }
      await etiqueta.destroy();
      return { mensaje: "Etiqueta eliminada exitosamente" };
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar la etiqueta");
    }
  }

  // POST /api/tareas/:id/etiquetas
  async asignarATarea(tareaId: number, etiquetaId: number) {
    try {
      const asignacion = await TareaEtiqueta.create({
        tarea_id: tareaId,
        etiqueta_id: etiquetaId
      });
      return { mensaje: "Etiqueta asignada exitosamente", asignacion };
    } catch (error) {
      console.error(error);
      throw new Error("Error al asignar la etiqueta a la tarea");
    }
  }

  // DELETE /api/tareas/:id/etiquetas/:etiqueta_id
  async desasignarDeTarea(tareaId: number, etiquetaId: number) {
    try {
      await TareaEtiqueta.destroy({
        where: {
          tarea_id: tareaId,
          etiqueta_id: etiquetaId
        }
      });
      return { mensaje: "Etiqueta desasignada exitosamente" };
    } catch (error) {
      console.error(error);
      throw new Error("Error al desasignar la etiqueta de la tarea");
    }
  }
}