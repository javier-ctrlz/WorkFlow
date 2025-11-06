import RegistroActividad from "../models/RegistroActividad";
import ActividadReciente from "../models/views/ActividadReciente";

export class ActividadClass {
  // GET /api/reportes/actividad
  async obtenerActividad(organizacionId: number) {
    try {
      return await ActividadReciente.findAll({
        where: { organizacion_id: organizacionId },
        order: [['creado_en', 'DESC']]
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener la actividad reciente");
    }
  }

  // Método interno para registrar actividad
  async registrar(datos: {
    organizacion_id: number;
    usuario_id: number;
    tipo_entidad: string;
    entidad_id: number;
    accion: string;
    descripcion?: string;
    cambios?: any;
    metadata?: any;
    direccion_ip?: string;
    agente_usuario?: string;
  }) {
    try {
      await RegistroActividad.create(datos);
    } catch (error) {
      console.error(error);
      console.error("Error al registrar la actividad");
    }
  }

  // GET /api/reportes/actividad/usuario/:id
  async obtenerActividadUsuario(usuarioId: number) {
    try {
      return await ActividadReciente.findAll({
        where: { usuario_id: usuarioId },
        order: [['creado_en', 'DESC']]
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener la actividad del usuario");
    }
  }

  // GET /api/reportes/actividad/proyecto/:id
  async obtenerActividadProyecto(proyectoId: number) {
    try {
      return await ActividadReciente.findAll({
        where: { 
          tipo_entidad: 'proyecto',
          entidad_id: proyectoId
        },
        order: [['creado_en', 'DESC']]
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener la actividad del proyecto");
    }
  }
}