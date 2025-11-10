import Usuario from '../models/Usuario';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class AuthClass {
  // POST /api/register-org
  async registrarOrganizacion(body: any) {
    try {
      const usuario = await Usuario.create({
        ...body.usuario,
        organizacion_id: body.organizacion.id,
        rol: 'admin',
      });
      return { mensaje: 'Usuario administrador registrado exitosamente', usuario };
    } catch (error) {
      console.error(error);
      throw new Error('Error al registrar el usuario administrador');
    }
  }

  // POST /api/login
  async login(email: string, password: string) {
    try {
      const usuario: any = await Usuario.findOne({
        where: { email },
      });
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      if (usuario.password_hash !== password) {
        throw new Error('Contraseña incorrecta');
      }
      await usuario.update({ ultimo_login: new Date() });
      const payload = {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre_completo,
        rol: usuario.rol,
      };

      // Generar token JWT
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'defaultsecret', {
        expiresIn: '1h',
      });
      return {
        mensaje: 'Inicio de sesión exitoso',
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre_completo,
          email: usuario.email,
          rol: usuario.rol,
        },
        token,
      };
    } catch (error: any) {
      console.error('Error en login:', error);
      throw new Error(error.message || 'Error en el inicio de sesión');
    }
  }
}
