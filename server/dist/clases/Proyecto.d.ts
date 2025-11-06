export declare class ProyectoClass {
    obtenerTodos(organizacionId: number): Promise<import("sequelize").Model<any, any>[]>;
    crear(body: any): Promise<{
        mensaje: string;
        proyecto: import("sequelize").Model<any, any>;
    }>;
    obtenerPorId(id: number): Promise<import("sequelize").Model<any, any> | null>;
    actualizar(id: number, body: any): Promise<{
        mensaje: string;
        proyecto: import("sequelize").Model<any, any>;
    }>;
    eliminar(id: number): Promise<{
        mensaje: string;
    }>;
    agregarMiembro(proyectoId: number, body: any): Promise<{
        mensaje: string;
        miembro: import("sequelize").Model<any, any>;
    }>;
    eliminarMiembro(proyectoId: number, usuarioId: number): Promise<{
        mensaje: string;
    }>;
    obtenerEstadisticas(organizacionId: number): Promise<import("sequelize").Model<any, any>[]>;
}
//# sourceMappingURL=Proyecto.d.ts.map