export declare class UsuarioClass {
    obtenerTodos(): Promise<import("sequelize").Model<any, any>[]>;
    crear(body: any): Promise<{
        mensaje: string;
        usuario: import("sequelize").Model<any, any>;
    }>;
    obtenerPorId(id: number): Promise<import("sequelize").Model<any, any> | null>;
    actualizar(id: number, body: any): Promise<{
        mensaje: string;
        usuario: import("sequelize").Model<any, any>;
    }>;
    eliminar(id: number): Promise<{
        mensaje: string;
    }>;
    obtenerCargaTrabajo(organizacionId: number): Promise<import("sequelize").Model<any, any>[]>;
}
//# sourceMappingURL=Usuario.d.ts.map