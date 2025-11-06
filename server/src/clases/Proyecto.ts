import Proyecto from "../models/Proyecto";
import MiembroProyecto from "../models/MiembroProyecto";
import EstadisticasProyecto from "../models/views/EstadisticasProyecto";

export class ProyectoClass {
  // GET /api/proyectos
  async obtenerTodos(organizacionId: number) {
    try {
      return await Proyecto.findAll({
        where: { organizacion_id: organizacionId }
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los proyectos");
    }
  }

  // POST /api/proyectos
  async crear(body: any) {
    try {
      const proyecto = await Proyecto.create(body);
      return { mensaje: "Proyecto creado exitosamente", proyecto };
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear el proyecto");
    }
  }

  // GET /api/proyectos/:id
  async obtenerPorId(id: number) {
    try {
      return await Proyecto.findByPk(id);
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener el proyecto");
    }
  }

  // PUT /api/proyectos/:id
  async actualizar(id: number, body: any) {
    try {
      const proyecto = await Proyecto.findByPk(id);
      if (!proyecto) {
        throw new Error("Proyecto no encontrado");
      }
      await proyecto.update(body);
      return { mensaje: "Proyecto actualizado exitosamente", proyecto };
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar el proyecto");
    }
  }

  // DELETE /api/proyectos/:id
  async eliminar(id: number) {
    try {
      const proyecto = await Proyecto.findByPk(id);
      if (!proyecto) {
        throw new Error("Proyecto no encontrado");
      }
      await proyecto.destroy();
      return { mensaje: "Proyecto eliminado exitosamente" };
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el proyecto");
    }
  }

  // POST /api/proyectos/:id/miembros
  async agregarMiembro(proyectoId: number, body: any) {
    try {
      const miembro = await MiembroProyecto.create({
        ...body,
        proyecto_id: proyectoId
      });
      return { mensaje: "Miembro agregado exitosamente", miembro };
    } catch (error) {
      console.error(error);
      throw new Error("Error al agregar el miembro al proyecto");
    }
  }

  // DELETE /api/proyectos/:id/miembros/:usuario_id
  async eliminarMiembro(proyectoId: number, usuarioId: number) {
    try {
      await MiembroProyecto.destroy({
        where: {
          proyecto_id: proyectoId,
          usuario_id: usuarioId
        }
      });
      return { mensaje: "Miembro eliminado exitosamente" };
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el miembro del proyecto");
    }
  }

  // GET /api/reportes/proyectos
  async obtenerEstadisticas(organizacionId: number) {
    try {
      return await EstadisticasProyecto.findAll({
        where: { organizacion_id: organizacionId }
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener las estadísticas de los proyectos");
    }
  }
}