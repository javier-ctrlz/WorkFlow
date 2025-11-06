import ComentarioTarea from "../models/ComentarioTarea";

export class ComentarioTareaClass {
  // GET /api/tareas/:id/comentarios
  async obtenerPorTarea(tareaId: number) {
    try {
      return await ComentarioTarea.findAll({
        where: { tarea_id: tareaId },
        order: [['creado_en', 'ASC']]
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los comentarios de la tarea");
    }
  }

  // POST /api/tareas/:id/comentarios
  async crear(body: any) {
    try {
      const comentario = await ComentarioTarea.create(body);
      return { mensaje: "Comentario creado exitosamente", comentario };
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear el comentario");
    }
  }

  // PUT /api/comentarios/:id
  async actualizar(id: number, body: any) {
    try {
      const comentario = await ComentarioTarea.findByPk(id);
      if (!comentario) {
        throw new Error("Comentario no encontrado");
      }
      await comentario.update({
        ...body,
        esta_editado: true
      });
      return { mensaje: "Comentario actualizado exitosamente", comentario };
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar el comentario");
    }
  }

  // DELETE /api/comentarios/:id
  async eliminar(id: number) {
    try {
      const comentario = await ComentarioTarea.findByPk(id);
      if (!comentario) {
        throw new Error("Comentario no encontrado");
      }
      await comentario.destroy();
      return { mensaje: "Comentario eliminado exitosamente" };
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el comentario");
    }
  }

  // GET /api/tareas/:id/comentarios/respuestas/:comentario_id
  async obtenerRespuestas(comentarioId: number) {
    try {
      return await ComentarioTarea.findAll({
        where: { comentario_padre_id: comentarioId },
        order: [['creado_en', 'ASC']]
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener las respuestas del comentario");
    }
  }
}