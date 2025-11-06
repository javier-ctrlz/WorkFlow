import Usuario from "../models/Usuario";

export class AuthClass {
  // POST /api/register-org
  async registrarOrganizacion(body: any) {
    try {
      const usuario = await Usuario.create({
        ...body.usuario,
        organizacion_id: body.organizacion.id,
        rol: 'admin'
      });
      return { mensaje: "Usuario administrador registrado exitosamente", usuario };
    } catch (error) {
      console.error(error);
      throw new Error("Error al registrar el usuario administrador");
    }
  }

  // POST /api/login
  async login(email: string, password: string) {
    try {
      const usuario = await Usuario.findOne({
        where: { email }
      });

      if (!usuario) {
        throw new Error("Usuario no encontrado");
      }

      await usuario.update({ ultimo_login: new Date() });

      return { mensaje: "Inicio de sesión exitoso", usuario };
    } catch (error) {
      console.error(error);
      throw new Error("Error en el inicio de sesión");
    }
  }
}