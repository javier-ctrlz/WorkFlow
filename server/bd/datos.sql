USE workflow;

-- ============================================================
-- ORGANIZACIONES
-- ============================================================
INSERT INTO organizaciones (nombre, slug, descripcion, plan, estado, maximo_usuarios, maximo_proyectos)
VALUES
('Acme Corporation', 'acme-corp', 'Desarrollo de soluciones web empresariales', 'profesional', 'activo', 50, 20),
('TechNova Labs', 'technova-labs', 'Startup de innovación en IA y robótica', 'empresarial', 'activo', 100, 30),
('GreenSoft', 'greensoft', 'Software sostenible y ecológico', 'gratuito', 'activo', 10, 5);

-- ============================================================
-- USUARIOS
-- ============================================================
INSERT INTO usuarios (organizacion_id, email, password_hash, nombre_completo, rol, esta_activo, email_verificado)
VALUES
-- Acme
(1, 'admin@acme.com', 'hash_admin', 'Administrador Acme', 'admin', TRUE, TRUE),
(1, 'pm@acme.com', 'hash_pm', 'Gestor de Proyectos Acme', 'gestor_proyecto', TRUE, TRUE),
(1, 'user1@acme.com', 'hash_user1', 'Carlos Gómez', 'miembro', TRUE, TRUE),
-- TechNova
(2, 'admin@technova.com', 'hash_admin2', 'Admin TechNova', 'admin', TRUE, TRUE),
(2, 'pm@technova.com', 'hash_pm2', 'Lina Torres', 'gestor_proyecto', TRUE, TRUE),
(2, 'user1@technova.com', 'hash_user2', 'Miguel Díaz', 'miembro', TRUE, TRUE),
-- GreenSoft
(3, 'admin@greensoft.com', 'hash_admin3', 'Admin GreenSoft', 'admin', TRUE, TRUE),
(3, 'pm@greensoft.com', 'hash_pm3', 'Ana Ruiz', 'gestor_proyecto', TRUE, TRUE),
(3, 'user1@greensoft.com', 'hash_user3', 'Sofía Morales', 'miembro', TRUE, TRUE);

-- ============================================================
-- PROYECTOS
-- ============================================================
INSERT INTO proyectos (organizacion_id, propietario_id, nombre, descripcion, estado, prioridad, fecha_inicio, fecha_limite, porcentaje_progreso)
VALUES
-- Acme
(1, 2, 'CRM Corporativo', 'Sistema CRM para clientes empresariales', 'activo', 'alta', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 60 DAY), 45.00),
(1, 2, 'Intranet RH', 'Portal interno para recursos humanos', 'en_espera', 'media', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 90 DAY), 10.00),
-- TechNova
(2, 5, 'IA Predictiva', 'Modelo IA para predicción de demanda', 'activo', 'urgente', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 55.00),
(2, 5, 'Control Robótico', 'Sistema de control autónomo para robots', 'planificacion', 'alta', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 120 DAY), 0.00),
-- GreenSoft
(3, 8, 'EcoTracker App', 'Aplicación móvil para seguimiento de huella ecológica', 'activo', 'alta', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 75 DAY), 60.00),
(3, 8, 'Panel Solar IoT', 'Plataforma IoT para monitoreo de energía solar', 'planificacion', 'media', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 150 DAY), 20.00);

-- ============================================================
-- MIEMBROS DE PROYECTO
-- ============================================================
INSERT INTO miembros_proyecto (proyecto_id, usuario_id, rol, agregado_por)
VALUES
-- Acme
(1, 2, 'propietario', 1),
(1, 3, 'miembro', 2),
(2, 2, 'propietario', 1),
(2, 3, 'miembro', 2),
-- TechNova
(3, 5, 'propietario', 4),
(3, 6, 'miembro', 5),
(4, 5, 'propietario', 4),
(4, 6, 'miembro', 5),
-- GreenSoft
(5, 8, 'propietario', 7),
(5, 9, 'miembro', 8),
(6, 8, 'propietario', 7),
(6, 9, 'miembro', 8);

-- ============================================================
-- ETIQUETAS
-- ============================================================
INSERT INTO etiquetas (organizacion_id, nombre, color)
VALUES
(1, 'Frontend', '#3B82F6'),
(1, 'Backend', '#10B981'),
(1, 'Infraestructura', '#F59E0B'),
(2, 'IA', '#8B5CF6'),
(2, 'Robótica', '#EC4899'),
(2, 'DevOps', '#EF4444'),
(3, 'Móvil', '#3B82F6'),
(3, 'Energía', '#22C55E'),
(3, 'Sostenibilidad', '#FBBF24');

-- ============================================================
-- TAREAS
-- ============================================================
-- 30 tareas realistas, distribuidas entre proyectos
INSERT INTO tareas (proyecto_id, organizacion_id, titulo, descripcion, estado, prioridad, asignado_a, creado_por, fecha_vencimiento, columna_kanban, horas_estimadas, horas_reales)
VALUES
-- CRM (Acme)
(1, 1, 'Diseñar interfaz de clientes', 'Diseño del módulo principal de clientes', 'en_progreso', 'alta', 3, 2, DATE_ADD(CURDATE(), INTERVAL 5 DAY), 'en_progreso', 10, 4),
(1, 1, 'Implementar API REST de clientes', 'CRUD de clientes en Express.js', 'pendiente', 'alta', 3, 2, DATE_ADD(CURDATE(), INTERVAL 15 DAY), 'pendiente', 20, NULL),
(1, 1, 'Conectar con base de datos', 'Integrar MySQL con ORM Sequelize', 'en_revision', 'media', 3, 2, DATE_ADD(CURDATE(), INTERVAL 7 DAY), 'en_revision', 12, 10),
(1, 1, 'Pruebas de integración', 'Test end-to-end con Jest y Supertest', 'pendiente', 'media', 3, 2, DATE_ADD(CURDATE(), INTERVAL 20 DAY), 'pendiente', 15, NULL),
(1, 1, 'Optimizar consultas SQL', 'Indexación de tablas y reducción de joins', 'pendiente', 'alta', 3, 2, DATE_ADD(CURDATE(), INTERVAL 10 DAY), 'pendiente', 8, NULL),

-- Intranet RH (Acme)
(2, 1, 'Diseñar dashboard de empleados', 'UI de la página principal', 'en_progreso', 'media', 3, 2, DATE_ADD(CURDATE(), INTERVAL 8 DAY), 'en_progreso', 14, 6),
(2, 1, 'Implementar roles de usuario', 'Roles admin, gestor, empleado', 'pendiente', 'alta', 3, 2, DATE_ADD(CURDATE(), INTERVAL 14 DAY), 'pendiente', 10, NULL),
(2, 1, 'Generar reportes PDF', 'Reportes mensuales de desempeño', 'pendiente', 'baja', 3, 2, DATE_ADD(CURDATE(), INTERVAL 25 DAY), 'pendiente', 16, NULL),

-- IA Predictiva (TechNova)
(3, 2, 'Recolectar dataset histórico', 'Datos de ventas y estacionalidad', 'en_progreso', 'alta', 6, 5, DATE_ADD(CURDATE(), INTERVAL 4 DAY), 'en_progreso', 18, 8),
(3, 2, 'Entrenar modelo ML', 'Modelo Random Forest para predicciones', 'pendiente', 'urgente', 6, 5, DATE_ADD(CURDATE(), INTERVAL 14 DAY), 'pendiente', 24, NULL),
(3, 2, 'Evaluar métricas de precisión', 'Analizar RMSE y MAE', 'pendiente', 'media', 6, 5, DATE_ADD(CURDATE(), INTERVAL 10 DAY), 'pendiente', 12, NULL),
(3, 2, 'Implementar API de predicciones', 'Endpoint /predict con FastAPI', 'pendiente', 'alta', 6, 5, DATE_ADD(CURDATE(), INTERVAL 20 DAY), 'pendiente', 16, NULL),

-- Control Robótico (TechNova)
(4, 2, 'Diseñar firmware de control', 'Microcontroladores ESP32', 'en_progreso', 'alta', 6, 5, DATE_ADD(CURDATE(), INTERVAL 12 DAY), 'en_progreso', 20, 6),
(4, 2, 'Probar motores servo', 'Pruebas unitarias con simulador', 'pendiente', 'media', 6, 5, DATE_ADD(CURDATE(), INTERVAL 18 DAY), 'pendiente', 8, NULL),
(4, 2, 'Integrar sensores', 'Lectura de datos en tiempo real', 'pendiente', 'alta', 6, 5, DATE_ADD(CURDATE(), INTERVAL 25 DAY), 'pendiente', 15, NULL),

-- EcoTracker (GreenSoft)
(5, 3, 'Diseñar interfaz móvil', 'Pantallas para registro y progreso', 'en_progreso', 'alta', 9, 8, DATE_ADD(CURDATE(), INTERVAL 6 DAY), 'en_progreso', 20, 10),
(5, 3, 'Implementar autenticación', 'Login con Firebase Auth', 'pendiente', 'media', 9, 8, DATE_ADD(CURDATE(), INTERVAL 10 DAY), 'pendiente', 10, NULL),
(5, 3, 'Dashboard de impacto ecológico', 'Resumen semanal del usuario', 'pendiente', 'alta', 9, 8, DATE_ADD(CURDATE(), INTERVAL 20 DAY), 'pendiente', 16, NULL),
(5, 3, 'Notificaciones push', 'Firebase Cloud Messaging', 'pendiente', 'baja', 9, 8, DATE_ADD(CURDATE(), INTERVAL 18 DAY), 'pendiente', 8, NULL),

-- Panel Solar IoT (GreenSoft)
(6, 3, 'Diseñar panel web de monitoreo', 'Interfaz con gráficos en tiempo real', 'en_progreso', 'alta', 9, 8, DATE_ADD(CURDATE(), INTERVAL 5 DAY), 'en_progreso', 18, 12),
(6, 3, 'Conectar sensores MQTT', 'Datos desde dispositivos IoT', 'pendiente', 'alta', 9, 8, DATE_ADD(CURDATE(), INTERVAL 15 DAY), 'pendiente', 14, NULL),
(6, 3, 'Registrar métricas de energía', 'Consumo diario y generación', 'pendiente', 'media', 9, 8, DATE_ADD(CURDATE(), INTERVAL 25 DAY), 'pendiente', 10, NULL);

-- ============================================================
-- RELACIÓN TAREAS - ETIQUETAS
-- ============================================================
INSERT INTO tareas_etiquetas (tarea_id, etiqueta_id)
SELECT id, FLOOR(1 + (RAND() * 9)) FROM tareas LIMIT 30;

-- ============================================================
-- COMENTARIOS
-- ============================================================
INSERT INTO comentarios_tareas (tarea_id, usuario_id, contenido)
VALUES
(1, 3, 'UI de clientes casi completa'),
(3, 2, 'Listo para revisión por QA'),
(9, 6, 'Dataset recolectado de últimos 2 años'),
(10, 6, 'Modelo en entrenamiento inicial'),
(16, 9, 'Autenticación Firebase configurada'),
(20, 9, 'Sensores MQTT conectados correctamente');

-- ============================================================
-- REGISTROS DE ACTIVIDAD
-- ============================================================
INSERT INTO registros_actividad (organizacion_id, usuario_id, tipo_entidad, entidad_id, accion, descripcion)
VALUES
(1, 1, 'proyecto', 1, 'creado', 'Proyecto CRM Corporativo creado'),
(1, 2, 'tarea', 1, 'actualizado', 'Tarea de UI marcada como en progreso'),
(2, 5, 'proyecto', 3, 'creado', 'Proyecto IA Predictiva iniciado'),
(2, 6, 'tarea', 9, 'creado', 'Tarea "Recolectar dataset histórico" creada'),
(3, 8, 'tarea', 16, 'creado', 'Tarea de autenticación creada para EcoTracker');
