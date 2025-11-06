import Usuario from "../models/Usuario";
import CargaTrabajoUsuario from "../models/views/CargaTrabajoUsuario";

export class UsuarioClass {
  // GET /api/usuarios
  async obtenerTodos() {
    try {
      return await Usuario.findAll();
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los usuarios");
    }
  }

  // POST /api/usuarios
  async crear(body: any) {
    try {
      const usuario = await Usuario.create(body);
      return { mensaje: "Usuario creado exitosamente", usuario };
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear el usuario");
    }
  }

  // GET /api/usuarios/:id
  async obtenerPorId(id: number) {
    try {
      return await Usuario.findByPk(id);
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener el usuario");
    }
  }

  // PUT /api/usuarios/:id
  async actualizar(id: number, body: any) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }
      await usuario.update(body);
      return { mensaje: "Usuario actualizado exitosamente", usuario };
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar el usuario");
    }
  }

  // DELETE /api/usuarios/:id
  async eliminar(id: number) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }
      await usuario.destroy();
      return { mensaje: "Usuario eliminado exitosamente" };
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el usuario");
    }
  }

  // GET /api/reportes/usuarios (carga de trabajo)
  async obtenerCargaTrabajo(organizacionId: number) {
    try {
      return await CargaTrabajoUsuario.findAll({
        where: { organizacion_id: organizacionId }
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener la carga de trabajo de los usuarios");
    }
  }
}