import Tarea from "../models/Tarea";
import TareaDetallada from "../models/views/TareaDetallada";
import { Op } from "sequelize";

export class TareaClass {
  // GET /api/tareas
  async obtenerTodas(filtros: any = {}) {
    try {
      const where: any = {};
      
      if (filtros.proyecto_id) {
        where.proyecto_id = filtros.proyecto_id;
      }
      if (filtros.estado) {
        where.estado = filtros.estado;
      }
      if (filtros.organizacion_id) {
        where.organizacion_id = filtros.organizacion_id;
      }

      return await Tarea.findAll({ where });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener las tareas");
    }
  }

  // POST /api/tareas
  async crear(body: any) {
    try {
      const tarea = await Tarea.create(body);
      return { mensaje: "Tarea creada exitosamente", tarea };
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear la tarea");
    }
  }

  // GET /api/tareas/:id
  async obtenerPorId(id: number) {
    try {
      return await TareaDetallada.findByPk(id);
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener la tarea");
    }
  }

  // PUT /api/tareas/:id
  async actualizar(id: number, body: any) {
    try {
      const tarea = await Tarea.findByPk(id);
      if (!tarea) {
        throw new Error("Tarea no encontrada");
      }
      await tarea.update(body);
      return { mensaje: "Tarea actualizada exitosamente", tarea };
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar la tarea");
    }
  }

  // PATCH /api/tareas/:id/estado
  async actualizarEstado(id: number, estado: string) {
    try {
      const tarea = await Tarea.findByPk(id);
      if (!tarea) {
        throw new Error("Tarea no encontrada");
      }
      await tarea.update({ 
        estado,
        columna_kanban: estado,
        ...(estado === 'completada' ? { completado_en: new Date() } : {})
      });
      return { mensaje: "Estado de tarea actualizado exitosamente", tarea };
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar el estado de la tarea");
    }
  }

  // DELETE /api/tareas/:id
  async eliminar(id: number) {
    try {
      const tarea = await Tarea.findByPk(id);
      if (!tarea) {
        throw new Error("Tarea no encontrada");
      }
      await tarea.destroy();
      return { mensaje: "Tarea eliminada exitosamente" };
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar la tarea");
    }
  }

  // GET /api/reportes/tareas
  async obtenerDetalladas(organizacionId: number) {
    try {
      return await TareaDetallada.findAll({
        where: { organizacion_id: organizacionId }
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener el reporte detallado de tareas");
    }
  }

  // GET /api/reportes/tareas/vencidas
  async obtenerTareasVencidas(organizacionId: number) {
    try {
      return await TareaDetallada.findAll({
        where: {
          organizacion_id: organizacionId,
          fecha_vencimiento: {
            [Op.lt]: new Date()
          },
          estado: {
            [Op.ne]: 'completada'
          }
        }
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener las tareas vencidas");
    }
  }
}