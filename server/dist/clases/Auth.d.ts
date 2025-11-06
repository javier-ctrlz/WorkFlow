export declare class AuthClass {
    registrarOrganizacion(body: any): Promise<{
        mensaje: string;
        usuario: import("sequelize").Model<any, any>;
    }>;
    login(email: string, password: string): Promise<{
        mensaje: string;
        usuario: import("sequelize").Model<any, any>;
    }>;
}
//# sourceMappingURL=Auth.d.ts.map