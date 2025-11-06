-- ============================================================
-- WorkFlowManager
-- Versión "final"
-- ============================================================

DROP DATABASE IF EXISTS workflow;

CREATE DATABASE workflow;
USE workflow;

-- Eliminar tablas existentes
DROP TABLE IF EXISTS registros_actividad;
DROP TABLE IF EXISTS comentarios_tareas;
DROP TABLE IF EXISTS tareas_etiquetas;
DROP TABLE IF EXISTS etiquetas;
DROP TABLE IF EXISTS miembros_proyecto;
DROP TABLE IF EXISTS tareas;
DROP TABLE IF EXISTS proyectos;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS organizaciones;

-- Eliminar vistas existentes
DROP VIEW IF EXISTS carga_trabajo_usuarios;
DROP VIEW IF EXISTS estadisticas_proyectos;
DROP VIEW IF EXISTS tareas_detalladas;
DROP VIEW IF EXISTS actividad_reciente;
DROP VIEW IF EXISTS resumen_organizaciones;

-- ============================================================
-- TABLA: organizaciones
-- ============================================================
CREATE TABLE organizaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL COMMENT 'Identificador amigable para URL',
    descripcion TEXT,
    logo_url VARCHAR(500),
    plan VARCHAR(50) DEFAULT 'gratuito' COMMENT 'gratuito, profesional, empresarial',
    estado VARCHAR(20) DEFAULT 'activo' COMMENT 'activo, suspendido, prueba, inactivo',
    maximo_usuarios INT DEFAULT 10,
    maximo_proyectos INT DEFAULT 5,
    fecha_fin_prueba DATETIME,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_org_plan CHECK (plan IN ('gratuito', 'profesional', 'empresarial')),
    CONSTRAINT chk_org_estado CHECK (estado IN ('activo', 'suspendido', 'prueba', 'inactivo')),
    INDEX idx_organizaciones_slug (slug),
    INDEX idx_organizaciones_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: usuarios
-- ============================================================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organizacion_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL DEFAULT 'miembro' COMMENT 'admin, gestor_proyecto, miembro',
    avatar_url VARCHAR(500),
    telefono VARCHAR(20),
    departamento VARCHAR(100),
    puesto_trabajo VARCHAR(100),
    biografia TEXT,
    esta_activo BOOLEAN DEFAULT TRUE,
    email_verificado BOOLEAN DEFAULT FALSE,
    ultimo_login DATETIME,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_usuario_rol CHECK (rol IN ('admin', 'gestor_proyecto', 'miembro')),
    UNIQUE KEY unique_email_por_org (organizacion_id, email),
    INDEX idx_usuarios_organizacion (organizacion_id),
    INDEX idx_usuarios_email (email),
    INDEX idx_usuarios_rol (rol),
    INDEX idx_usuarios_activo (esta_activo),

    FOREIGN KEY (organizacion_id) REFERENCES organizaciones(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: proyectos
-- ============================================================
CREATE TABLE proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organizacion_id INT NOT NULL,
    propietario_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(50) DEFAULT 'activo' COMMENT 'planificacion, activo, en_espera, completado, cancelado',
    prioridad VARCHAR(20) DEFAULT 'media' COMMENT 'baja, media, alta, urgente',
    color VARCHAR(7) COMMENT 'Código de color HEX',
    icono VARCHAR(50) COMMENT 'Icono lucide-react',

    fecha_inicio DATE,
    fecha_fin DATE,
    fecha_limite DATE,
    completado_en DATETIME,

    porcentaje_progreso DECIMAL(5, 2) DEFAULT 0.00 COMMENT '0.00 a 100.00',

    ia_descripcion TEXT,
    ia_tareas_sugeridas TEXT,
    ia_duracion_estimada INT,
    ia_fecha_predicha DATE,

    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_proyecto_estado CHECK (estado IN ('planificacion', 'activo', 'en_espera', 'completado', 'cancelado')),
    CONSTRAINT chk_proyecto_prioridad CHECK (prioridad IN ('baja', 'media', 'alta', 'urgente')),
    CONSTRAINT chk_proyecto_progreso CHECK (porcentaje_progreso >= 0 AND porcentaje_progreso <= 100),

    INDEX idx_proyectos_organizacion (organizacion_id),
    INDEX idx_proyectos_propietario (propietario_id),
    INDEX idx_proyectos_estado (estado),
    INDEX idx_proyectos_prioridad (prioridad),
    INDEX idx_proyectos_fecha_limite (fecha_limite),

    FOREIGN KEY (organizacion_id) REFERENCES organizaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (propietario_id) REFERENCES usuarios(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: miembros_proyecto
-- ============================================================
CREATE TABLE miembros_proyecto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    rol VARCHAR(50) DEFAULT 'miembro' COMMENT 'propietario, gestor, miembro, observador',
    agregado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    agregado_por INT,

    CONSTRAINT chk_miembro_rol CHECK (rol IN ('propietario', 'gestor', 'miembro', 'observador')),
    UNIQUE KEY unique_proyecto_miembro (proyecto_id, usuario_id),
    INDEX idx_miembros_proyecto_proyecto (proyecto_id),
    INDEX idx_miembros_proyecto_usuario (usuario_id),

    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (agregado_por) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: tareas
-- ============================================================
CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT NOT NULL,
    organizacion_id INT NOT NULL,

    titulo VARCHAR(500) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(50) DEFAULT 'pendiente' COMMENT 'pendiente, en_progreso, en_revision, completada',
    prioridad VARCHAR(20) DEFAULT 'media' COMMENT 'baja, media, alta, urgente',

    asignado_a INT,
    creado_por INT NOT NULL,

    fecha_inicio DATE,
    fecha_vencimiento DATE,
    completado_en DATETIME,

    horas_estimadas DECIMAL(6, 2),
    horas_reales DECIMAL(6, 2),

    ia_descripcion TEXT,
    ia_prioridad_recomendada VARCHAR(20),
    ia_duracion_predicha DECIMAL(6, 2),
    ia_fecha_predicha DATE,

    columna_kanban VARCHAR(50) DEFAULT 'pendiente' COMMENT 'pendiente, en_progreso, en_revision, completada',
    posicion_kanban INT DEFAULT 0,

    etiquetas TEXT,
    adjuntos TEXT,
    esta_archivada BOOLEAN DEFAULT FALSE,

    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_tarea_estado CHECK (estado IN ('pendiente', 'en_progreso', 'en_revision', 'completada')),
    CONSTRAINT chk_tarea_prioridad CHECK (prioridad IN ('baja', 'media', 'alta', 'urgente')),
    CONSTRAINT chk_tarea_columna_kanban CHECK (columna_kanban IN ('pendiente', 'en_progreso', 'en_revision', 'completada')),

    INDEX idx_tareas_proyecto (proyecto_id),
    INDEX idx_tareas_organizacion (organizacion_id),
    INDEX idx_tareas_asignado_a (asignado_a),
    INDEX idx_tareas_creado_por (creado_por),
    INDEX idx_tareas_estado (estado),
    INDEX idx_tareas_prioridad (prioridad),
    INDEX idx_tareas_fecha_vencimiento (fecha_vencimiento),
    INDEX idx_tareas_kanban (columna_kanban, posicion_kanban),
    INDEX idx_tareas_org_proyecto_estado (organizacion_id, proyecto_id, estado),

    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE,
    FOREIGN KEY (organizacion_id) REFERENCES organizaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (asignado_a) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (creado_por) REFERENCES usuarios(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: etiquetas
-- ============================================================
CREATE TABLE etiquetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organizacion_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    color VARCHAR(7),
    descripcion TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_etiqueta_por_org (organizacion_id, nombre),
    INDEX idx_etiquetas_organizacion (organizacion_id),

    FOREIGN KEY (organizacion_id) REFERENCES organizaciones(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: tareas_etiquetas
-- ============================================================
CREATE TABLE tareas_etiquetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT NOT NULL,
    etiqueta_id INT NOT NULL,
    agregado_en DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_tarea_etiqueta (tarea_id, etiqueta_id),
    INDEX idx_tareas_etiquetas_tarea (tarea_id),
    INDEX idx_tareas_etiquetas_etiqueta (etiqueta_id),

    FOREIGN KEY (tarea_id) REFERENCES tareas(id) ON DELETE CASCADE,
    FOREIGN KEY (etiqueta_id) REFERENCES etiquetas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: comentarios_tareas
-- ============================================================
CREATE TABLE comentarios_tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarea_id INT NOT NULL,
    usuario_id INT NOT NULL,
    contenido TEXT NOT NULL,
    comentario_padre_id INT,
    esta_editado BOOLEAN DEFAULT FALSE,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_comentarios_tareas_tarea (tarea_id),
    INDEX idx_comentarios_tareas_usuario (usuario_id),
    INDEX idx_comentarios_tareas_padre (comentario_padre_id),

    FOREIGN KEY (tarea_id) REFERENCES tareas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (comentario_padre_id) REFERENCES comentarios_tareas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: registros_actividad
-- ============================================================
CREATE TABLE registros_actividad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    organizacion_id INT NOT NULL,
    usuario_id INT,
    tipo_entidad VARCHAR(50) NOT NULL,
    entidad_id INT NOT NULL,
    accion VARCHAR(100) NOT NULL,
    descripcion TEXT,
    cambios JSON,
    metadata JSON,
    direccion_ip VARCHAR(45),
    agente_usuario TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_actividad_tipo_entidad CHECK (tipo_entidad IN ('proyecto', 'tarea', 'usuario', 'organizacion', 'comentario', 'etiqueta')),

    INDEX idx_registros_actividad_organizacion (organizacion_id),
    INDEX idx_registros_actividad_usuario (usuario_id),
    INDEX idx_registros_actividad_entidad (tipo_entidad, entidad_id),
    INDEX idx_registros_actividad_creado_en (creado_en DESC),

    FOREIGN KEY (organizacion_id) REFERENCES organizaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- VISTAS
-- ============================================================

-- Vista de estadísticas por proyecto
CREATE OR REPLACE VIEW estadisticas_proyectos AS
SELECT 
    p.id AS proyecto_id,
    p.nombre AS proyecto_nombre,
    p.organizacion_id,
    COUNT(DISTINCT t.id) AS total_tareas,
    SUM(CASE WHEN t.estado = 'completada' THEN 1 ELSE 0 END) AS tareas_completadas,
    SUM(CASE WHEN t.estado = 'en_progreso' THEN 1 ELSE 0 END) AS tareas_en_progreso,
    SUM(CASE WHEN t.fecha_vencimiento < CURDATE() AND t.estado != 'completada' THEN 1 ELSE 0 END) AS tareas_vencidas,
    COUNT(DISTINCT mp.usuario_id) AS total_miembros,
    p.porcentaje_progreso,
    p.estado AS proyecto_estado,
    p.prioridad AS proyecto_prioridad,
    p.fecha_limite,
    p.creado_en,
    p.actualizado_en
FROM proyectos p
LEFT JOIN tareas t ON p.id = t.proyecto_id
LEFT JOIN miembros_proyecto mp ON p.id = mp.proyecto_id
GROUP BY p.id;

-- Vista de carga de trabajo por usuario
CREATE OR REPLACE VIEW carga_trabajo_usuarios AS
SELECT 
    u.id AS usuario_id,
    u.nombre_completo,
    u.email,
    u.organizacion_id,
    u.rol,
    u.departamento,
    COUNT(DISTINCT t.id) AS total_tareas_asignadas,
    SUM(CASE WHEN t.estado = 'en_progreso' THEN 1 ELSE 0 END) AS tareas_activas,
    SUM(CASE WHEN t.estado = 'pendiente' THEN 1 ELSE 0 END) AS tareas_pendientes,
    SUM(CASE WHEN t.estado = 'completada' THEN 1 ELSE 0 END) AS tareas_completadas,
    SUM(CASE WHEN t.fecha_vencimiento < CURDATE() AND t.estado != 'completada' THEN 1 ELSE 0 END) AS tareas_vencidas,
    COALESCE(SUM(CASE WHEN t.estado IN ('pendiente', 'en_progreso') THEN t.horas_estimadas ELSE 0 END), 0) AS total_horas_estimadas,
    COALESCE(SUM(t.horas_reales), 0) AS total_horas_reales
FROM usuarios u
LEFT JOIN tareas t ON u.id = t.asignado_a
GROUP BY u.id;

-- Vista de tareas detalladas
CREATE OR REPLACE VIEW tareas_detalladas AS
SELECT 
    t.id,
    t.titulo,
    t.descripcion,
    t.estado,
    t.prioridad,
    t.columna_kanban,
    t.posicion_kanban,
    t.fecha_inicio,
    t.fecha_vencimiento,
    t.completado_en,
    t.horas_estimadas,
    t.horas_reales,
    t.creado_en,
    t.actualizado_en,
    t.proyecto_id,
    p.nombre AS proyecto_nombre,
    p.estado AS proyecto_estado,
    t.organizacion_id,
    o.nombre AS organizacion_nombre,
    t.asignado_a AS usuario_asignado_id,
    ua.nombre_completo AS usuario_asignado_nombre,
    ua.email AS usuario_asignado_email,
    ua.avatar_url AS usuario_asignado_avatar,
    t.creado_por AS usuario_creador_id,
    uc.nombre_completo AS usuario_creador_nombre,
    uc.email AS usuario_creador_email,
    t.ia_descripcion,
    t.ia_prioridad_recomendada,
    t.ia_fecha_predicha,
    t.ia_duracion_predicha,
    (SELECT COUNT(*) FROM comentarios_tareas WHERE tarea_id = t.id) AS cantidad_comentarios,
    (SELECT COUNT(*) FROM tareas_etiquetas WHERE tarea_id = t.id) AS cantidad_etiquetas,
    CASE 
        WHEN t.fecha_vencimiento < CURDATE() AND t.estado != 'completada' THEN 'vencida'
        WHEN t.fecha_vencimiento = CURDATE() AND t.estado != 'completada' THEN 'vence_hoy'
        ELSE 'normal'
    END AS estado_urgencia
FROM tareas t
INNER JOIN proyectos p ON t.proyecto_id = p.id
INNER JOIN organizaciones o ON t.organizacion_id = o.id
INNER JOIN usuarios uc ON t.creado_por = uc.id
LEFT JOIN usuarios ua ON t.asignado_a = ua.id;

-- Vista de actividad reciente
CREATE OR REPLACE VIEW actividad_reciente AS
SELECT 
    ra.id,
    ra.organizacion_id,
    o.nombre AS organizacion_nombre,
    ra.usuario_id,
    u.nombre_completo AS usuario_nombre,
    u.email AS usuario_email,
    u.avatar_url AS usuario_avatar,
    ra.tipo_entidad,
    ra.entidad_id,
    ra.accion,
    ra.descripcion,
    ra.creado_en,
    CASE 
        WHEN ra.tipo_entidad = 'proyecto' THEN p.nombre
        WHEN ra.tipo_entidad = 'tarea' THEN t.titulo
        ELSE NULL
    END AS nombre_entidad
FROM registros_actividad ra
INNER JOIN organizaciones o ON ra.organizacion_id = o.id
LEFT JOIN usuarios u ON ra.usuario_id = u.id
LEFT JOIN proyectos p ON ra.tipo_entidad = 'proyecto' AND ra.entidad_id = p.id
LEFT JOIN tareas t ON ra.tipo_entidad = 'tarea' AND ra.entidad_id = t.id
ORDER BY ra.creado_en DESC;

-- Vista de resumen organizacional
CREATE OR REPLACE VIEW resumen_organizaciones AS
SELECT 
    o.id AS organizacion_id,
    o.nombre AS organizacion_nombre,
    o.slug,
    o.plan,
    o.estado,
    o.maximo_usuarios,
    o.maximo_proyectos,
    COUNT(DISTINCT u.id) AS total_usuarios,
    COUNT(DISTINCT p.id) AS total_proyectos,
    COUNT(DISTINCT t.id) AS total_tareas,
    SUM(CASE WHEN u.esta_activo = TRUE THEN 1 ELSE 0 END) AS usuarios_activos,
    SUM(CASE WHEN p.estado = 'activo' THEN 1 ELSE 0 END) AS proyectos_activos,
    SUM(CASE WHEN t.estado = 'en_progreso' THEN 1 ELSE 0 END) AS tareas_en_progreso,
    SUM(CASE WHEN t.estado = 'completada' THEN 1 ELSE 0 END) AS tareas_completadas,
    o.creado_en,
    o.actualizado_en
FROM organizaciones o
LEFT JOIN usuarios u ON o.id = u.organizacion_id
LEFT JOIN proyectos p ON o.id = p.organizacion_id
LEFT JOIN tareas t ON o.id = t.organizacion_id
GROUP BY o.id;
