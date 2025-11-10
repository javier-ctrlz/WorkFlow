export declare class AuthClass {
    registrarOrganizacion(body: any): Promise<{
        mensaje: string;
        usuario: import("sequelize").Model<any, any>;
    }>;
    login(email: string, password: string): Promise<{
        mensaje: string;
        usuario: {
            id: any;
            nombre: any;
            email: any;
            rol: any;
        };
        token: string;
    }>;
}
//# sourceMappingURL=Auth.d.ts.map