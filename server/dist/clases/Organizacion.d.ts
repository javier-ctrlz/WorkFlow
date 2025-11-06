export declare class OrganizacionClass {
    registrar(body: any): Promise<{
        mensaje: string;
        organizacion: import("sequelize").Model<any, any>;
    }>;
    obtenerTodas(): Promise<import("sequelize").Model<any, any>[]>;
    obtenerPorId(id: number): Promise<import("sequelize").Model<any, any> | null>;
    obtenerResumen(id: number): Promise<import("sequelize").Model<any, any> | null>;
    actualizar(id: number, body: any): Promise<{
        mensaje: string;
        organizacion: import("sequelize").Model<any, any>;
    }>;
    eliminar(id: number): Promise<{
        mensaje: string;
    }>;
}
//# sourceMappingURL=Organizacion.d.ts.map