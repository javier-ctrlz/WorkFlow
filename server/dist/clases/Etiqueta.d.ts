export declare class EtiquetaClass {
    obtenerTodas(organizacionId: number): Promise<import("sequelize").Model<any, any>[]>;
    crear(body: any): Promise<{
        mensaje: string;
        etiqueta: import("sequelize").Model<any, any>;
    }>;
    actualizar(id: number, body: any): Promise<{
        mensaje: string;
        etiqueta: import("sequelize").Model<any, any>;
    }>;
    eliminar(id: number): Promise<{
        mensaje: string;
    }>;
    asignarATarea(tareaId: number, etiquetaId: number): Promise<{
        mensaje: string;
        asignacion: import("sequelize").Model<any, any>;
    }>;
    desasignarDeTarea(tareaId: number, etiquetaId: number): Promise<{
        mensaje: string;
    }>;
}
//# sourceMappingURL=Etiqueta.d.ts.map