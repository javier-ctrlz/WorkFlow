export declare class ActividadClass {
    obtenerActividad(organizacionId: number): Promise<import("sequelize").Model<any, any>[]>;
    registrar(datos: {
        organizacion_id: number;
        usuario_id: number;
        tipo_entidad: string;
        entidad_id: number;
        accion: string;
        descripcion?: string;
        cambios?: any;
        metadata?: any;
        direccion_ip?: string;
        agente_usuario?: string;
    }): Promise<void>;
    obtenerActividadUsuario(usuarioId: number): Promise<import("sequelize").Model<any, any>[]>;
    obtenerActividadProyecto(proyectoId: number): Promise<import("sequelize").Model<any, any>[]>;
}
//# sourceMappingURL=Actividad.d.ts.map