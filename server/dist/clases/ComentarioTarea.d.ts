export declare class ComentarioTareaClass {
    obtenerPorTarea(tareaId: number): Promise<import("sequelize").Model<any, any>[]>;
    crear(body: any): Promise<{
        mensaje: string;
        comentario: import("sequelize").Model<any, any>;
    }>;
    actualizar(id: number, body: any): Promise<{
        mensaje: string;
        comentario: import("sequelize").Model<any, any>;
    }>;
    eliminar(id: number): Promise<{
        mensaje: string;
    }>;
    obtenerRespuestas(comentarioId: number): Promise<import("sequelize").Model<any, any>[]>;
}
//# sourceMappingURL=ComentarioTarea.d.ts.map