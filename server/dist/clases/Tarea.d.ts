export declare class TareaClass {
    obtenerTodas(filtros?: any): Promise<import("sequelize").Model<any, any>[]>;
    crear(body: any): Promise<{
        mensaje: string;
        tarea: import("sequelize").Model<any, any>;
    }>;
    obtenerPorId(id: number): Promise<import("sequelize").Model<any, any> | null>;
    actualizar(id: number, body: any): Promise<{
        mensaje: string;
        tarea: import("sequelize").Model<any, any>;
    }>;
    actualizarEstado(id: number, estado: string): Promise<{
        mensaje: string;
        tarea: import("sequelize").Model<any, any>;
    }>;
    eliminar(id: number): Promise<{
        mensaje: string;
    }>;
    obtenerDetalladas(organizacionId: number): Promise<import("sequelize").Model<any, any>[]>;
    obtenerTareasVencidas(organizacionId: number): Promise<import("sequelize").Model<any, any>[]>;
}
//# sourceMappingURL=Tarea.d.ts.map