import Organizacion from "../models/Organizacion";
import ResumenOrganizacion from "../models/views/ResumenOrganizacion";

export class OrganizacionClass {
  // POST /api/register-org
  async registrar(body: any) {
    try {
      const organizacion = await Organizacion.create(body);
      return { mensaje: "Organización registrada exitosamente", organizacion };
    } catch (error) {
      console.error(error);
      throw new Error("No se pudo registrar la organización");
    }
  }

  // GET /api/organizaciones
  async obtenerTodas() {
    try {
      return await Organizacion.findAll();
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener las organizaciones");
    }
  }

  // GET /api/organizaciones/:id
  async obtenerPorId(id: number) {
    try {
      return await Organizacion.findByPk(id);
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener la organización");
    }
  }

  // GET /api/organizaciones/:id/resumen
  async obtenerResumen(id: number) {
    try {
      return await ResumenOrganizacion.findByPk(id);
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener el resumen de la organización");
    }
  }

  // PUT /api/organizaciones/:id
  async actualizar(id: number, body: any) {
    try {
      const organizacion = await Organizacion.findByPk(id);
      if (!organizacion) {
        throw new Error("Organización no encontrada");
      }
      await organizacion.update(body);
      return { mensaje: "Organización actualizada exitosamente", organizacion };
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar la organización");
    }
  }

  // DELETE /api/organizaciones/:id
  async eliminar(id: number) {
    try {
      const organizacion = await Organizacion.findByPk(id);
      if (!organizacion) {
        throw new Error("Organización no encontrada");
      }
      await organizacion.destroy();
      return { mensaje: "Organización eliminada exitosamente" };
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar la organización");
    }
  }
}