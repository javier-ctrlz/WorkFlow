import { Request, Response } from 'express';
import { OrganizacionClass } from '../clases/Organizacion';
import { UsuarioClass } from '../clases/Usuario';
import { ProyectoClass } from '../clases/Proyecto';
import { TareaClass } from '../clases/Tarea';
import { EtiquetaClass } from '../clases/Etiqueta';
import { ComentarioTareaClass } from '../clases/ComentarioTarea';
import { ActividadClass } from '../clases/Actividad';
import { AuthClass } from '../clases/Auth';

// Instancias de las clases
const organizacionController = new OrganizacionClass();
const usuarioController = new UsuarioClass();
const proyectoController = new ProyectoClass();
const tareaController = new TareaClass();
const etiquetaController = new EtiquetaClass();
const comentarioController = new ComentarioTareaClass();
const actividadController = new ActividadClass();
const authController = new AuthClass();

// LOGIN Y REGISTRO
export const registrarOrganizacion = async (req: Request, res: Response) => {
  try {
    const organizacion = await organizacionController.registrar(req.body);
    const usuario = await authController.registrarOrganizacion({
      organizacion: organizacion.organizacion,
      usuario: req.body.usuario,
    });
    res.json({
      msg: 'Organización y usuario administrador registrados exitosamente',
      datos: { organizacion, usuario },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message || 'Error al registrar la organización',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const resultado = await authController.login(email, password);
    res.json(resultado);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

// ORGANIZACIONES
export const obtenerOrganizaciones = async (req: Request, res: Response) => {
  try {
    const organizaciones = await organizacionController.obtenerTodas();
    res.json(organizaciones);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerOrganizacionPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID de la organización',
      });
    }
    const organizacion = await organizacionController.obtenerPorId(parseInt(id));
    if (!organizacion) {
      return res.status(404).json({
        msg: 'Organización no encontrada',
      });
    }
    res.json({
      msg: 'Organización obtenida exitosamente',
      datos: organizacion,
    });
  }
  catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message || 'Error al obtener la organización',
    });
  }
};

export const obtenerResumenOrganizacion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID de la organización',
      });
    }
    const resumen = await organizacionController.obtenerResumen(parseInt(id));
    res.json({
      msg: 'Resumen de organización obtenido exitosamente',
      datos: resumen,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message || 'Error al obtener el resumen de la organización',
    });
  }
};

// USUARIOS
export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await usuarioController.obtenerTodos();
    res.json(usuarios);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID del usuario',
      });
    }
    const usuario = await usuarioController.obtenerPorId(parseInt(id));
    if (!usuario) {
      return res.status(404).json({
        msg: 'Usuario no encontrado',
      });
    }
    res.json({
      msg: 'Usuario obtenido exitosamente',
      datos: usuario,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message || 'Error al obtener el usuario',
    });
  }
};

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const resultado = await usuarioController.crear(req.body);
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID del usuario',
      });
    }
    const resultado = await usuarioController.actualizar(parseInt(id), req.body);
    res.json({
      msg: 'Usuario actualizado exitosamente',
      datos: resultado,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message || 'Error al actualizar el usuario',
    });
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID del usuario',
      });
    }
    const resultado = await usuarioController.eliminar(parseInt(id));
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// PROYECTOS
export const obtenerProyectos = async (req: Request, res: Response) => {
  try {
    const { organizacion_id } = req.query;
    const proyectos = await proyectoController.obtenerTodos(parseInt(organizacion_id as string));
    res.json(proyectos);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const crearProyecto = async (req: Request, res: Response) => {
  try {
    const resultado = await proyectoController.crear(req.body);
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerProyecto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID del proyecto',
      });
    }
    const proyecto = await proyectoController.obtenerPorId(parseInt(id));
    if (!proyecto) {
      return res.status(404).json({
        msg: 'Proyecto no encontrado',
      });
    }
    res.json({
      msg: 'Proyecto obtenido exitosamente',
      datos: proyecto,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message || 'Error al obtener el proyecto',
    });
  }
};

export const actualizarProyecto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID del proyecto',
      });
    }
    const proyectoId = parseInt(id);
    if (isNaN(proyectoId)) {
      return res.status(400).json({
        msg: 'El ID del proyecto debe ser un número válido',
      });
    }
    const resultado = await proyectoController.actualizar(proyectoId, req.body);
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarProyecto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID del proyecto',
      });
    }
    const proyectoId = parseInt(id);
    if (isNaN(proyectoId)) {
      return res.status(400).json({
        msg: 'El ID del proyecto debe ser un número válido',
      });
    }
    const resultado = await proyectoController.eliminar(proyectoId);
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// MIEMBROS DE PROYECTO
export const agregarMiembroProyecto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID del proyecto',
      });
    }
    const proyectoId = parseInt(id);
    if (isNaN(proyectoId)) {
      return res.status(400).json({
        msg: 'El ID del proyecto debe ser un número válido',
      });
    }
    const resultado = await proyectoController.agregarMiembro(proyectoId, req.body);
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarMiembroProyecto = async (req: Request, res: Response) => {
  try {
    const { id, usuario_id } = req.params;
    if (!id || !usuario_id) {
      return res.status(400).json({
        msg: 'Se requieren los IDs del proyecto y del usuario',
      });
    }
    const proyectoId = parseInt(id);
    const usuarioId = parseInt(usuario_id);
    if (isNaN(proyectoId) || isNaN(usuarioId)) {
      return res.status(400).json({
        msg: 'Los IDs del proyecto y del usuario deben ser números válidos',
      });
    }
    const resultado = await proyectoController.eliminarMiembro(proyectoId, usuarioId);
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// TAREAS
export const obtenerTareas = async (req: Request, res: Response) => {
  try {
    const tareas = await tareaController.obtenerTodas(req.query);
    res.json(tareas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

 export const obtenerTareaPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID de la tarea',
      });
    }
    const tarea = await tareaController.obtenerPorId(parseInt(id));
    if (!tarea) {
      return res.status(404).json({
        msg: 'Tarea no encontrada',
      });
    }
    res.json({
      msg: 'Tarea obtenida exitosamente',
      datos: tarea,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message || 'Error al obtener la tarea',
    });
  }
};

export const crearTarea = async (req: Request, res: Response) => {
  try {
    const resultado = await tareaController.crear(req.body);
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID de la tarea',
      });
    }
    const tareaId = parseInt(id);
    if (isNaN(tareaId)) {
      return res.status(400).json({
        msg: 'El ID de la tarea debe ser un número válido',
      });
    }
    const resultado = await tareaController.actualizar(tareaId, req.body);
    res.json({
      msg: 'Tarea actualizada exitosamente',
      datos: resultado,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message || 'Error al actualizar la tarea',
    });
  }
};

export const actualizarEstadoTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID de la tarea',
      });
    }

    const tareaId = parseInt(id);
    if (isNaN(tareaId)) {
      return res.status(400).json({
        msg: 'El ID de la tarea debe ser un número válido',
      });
    }

    if (!estado) {
      return res.status(400).json({
        msg: 'Se requiere el estado de la tarea',
      });
    }

    const resultado = await tareaController.actualizarEstado(tareaId, estado);

    res.json({
      msg: 'Estado de la tarea actualizado exitosamente',
      datos: resultado,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const eliminarTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID de la tarea',
      });
    }
    const tareaId = parseInt(id);
    if (isNaN(tareaId)) {
      return res.status(400).json({
        msg: 'El ID de la tarea debe ser un número válido',
      });
    }
    const resultado = await tareaController.eliminar(tareaId);
    res.json({
      msg: 'Tarea eliminada exitosamente',
      datos: resultado,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message,
    });
  }
};

// ETIQUETAS
export const obtenerEtiquetas = async (req: Request, res: Response) => {
  try {
    const { organizacion_id } = req.query;
    const etiquetas = await etiquetaController.obtenerTodas(parseInt(organizacion_id as string));
    res.json(etiquetas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const crearEtiqueta = async (req: Request, res: Response) => {
  try {
    const resultado = await etiquetaController.crear(req.body);
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// COMENTARIOS
export const obtenerComentariosTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID de la tarea',
      });
    }
    const tareaId = parseInt(id);
    if (isNaN(tareaId)) {
      return res.status(400).json({
        msg: 'El ID de la tarea debe ser un número válido',
      });
    }
    const comentarios = await comentarioController.obtenerPorTarea(tareaId);
    res.json({
      msg: 'Comentarios obtenidos exitosamente',
      datos: comentarios,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message || 'Error al obtener los comentarios',
    });
  }
};

export const crearComentarioTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID de la tarea',
      });
    }
    const tareaId = parseInt(id);
    if (isNaN(tareaId)) {
      return res.status(400).json({
        msg: 'El ID de la tarea debe ser un número válido',
      });
    }
    const resultado = await comentarioController.crear({
      ...req.body,
      tarea_id: tareaId,
    });
    res.json({
      msg: 'Comentario creado exitosamente',
      datos: resultado,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message || 'Error al crear el comentario',
    });
  }
};

export const eliminarComentarioTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        msg: 'Se requiere el ID del comentario',
      });
    }
    const resultado = await comentarioController.eliminar(parseInt(id));
    res.json({
      msg: 'Comentario eliminado exitosamente',
      datos: resultado,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      msg: error.message || 'Error al eliminar el comentario',
    });
  }
};

// REPORTES
export const obtenerEstadisticasProyectos = async (req: Request, res: Response) => {
  try {
    const { organizacion_id } = req.query;
    const estadisticas = await proyectoController.obtenerEstadisticas(
      parseInt(organizacion_id as string)
    );
    res.json(estadisticas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerCargaTrabajoUsuarios = async (req: Request, res: Response) => {
  try {
    const { organizacion_id } = req.query;
    const cargaTrabajo = await usuarioController.obtenerCargaTrabajo(
      parseInt(organizacion_id as string)
    );
    res.json(cargaTrabajo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerTareasDetalladas = async (req: Request, res: Response) => {
  try {
    const { organizacion_id } = req.query;
    const tareas = await tareaController.obtenerDetalladas(parseInt(organizacion_id as string));
    res.json(tareas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerActividad = async (req: Request, res: Response) => {
  try {
    const { organizacion_id } = req.query;
    const actividad = await actividadController.obtenerActividad(
      parseInt(organizacion_id as string)
    );
    res.json(actividad);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
