import re
from typing import Optional, List
from app.models.regla import Regla

# ─────────────────────────────────────────────────────────────────────────────
# Reglas semilla (fallback genérico, no se persisten en BBDD)
# ─────────────────────────────────────────────────────────────────────────────
REGLAS_SEMILLA = [
    # Personal / RRHH
    {"palabra_clave": "nomina",            "categoria": "Personal",        "tipo": "Ingreso"},
    {"palabra_clave": "sueldo",            "categoria": "Personal",        "tipo": "Ingreso"},
    {"palabra_clave": "seguridad social",  "categoria": "Personal",        "tipo": "Gasto"},
    {"palabra_clave": "irpf",             "categoria": "Personal",        "tipo": "Gasto"},
    {"palabra_clave": "salario",          "categoria": "Personal",        "tipo": "Ingreso"},
    # Operación
    {"palabra_clave": "amazon web services","categoria": "Operación",      "tipo": "Gasto"},
    {"palabra_clave": "aws",              "categoria": "Operación",       "tipo": "Gasto"},
    {"palabra_clave": "google cloud",     "categoria": "Operación",       "tipo": "Gasto"},
    {"palabra_clave": "microsoft",        "categoria": "Operación",       "tipo": "Gasto"},
    {"palabra_clave": "digitalocean",     "categoria": "Operación",       "tipo": "Gasto"},
    {"palabra_clave": "hosting",          "categoria": "Operación",       "tipo": "Gasto"},
    {"palabra_clave": "alquiler",         "categoria": "Operación",       "tipo": "Gasto"},
    {"palabra_clave": "luz",              "categoria": "Operación",       "tipo": "Gasto"},
    {"palabra_clave": "agua",             "categoria": "Operación",       "tipo": "Gasto"},
    {"palabra_clave": "internet",         "categoria": "Operación",       "tipo": "Gasto"},
    {"palabra_clave": "telefon",          "categoria": "Operación",       "tipo": "Gasto"},
    # Comercial
    {"palabra_clave": "facebook",         "categoria": "Comercial",       "tipo": "Gasto"},
    {"palabra_clave": "google ads",       "categoria": "Comercial",       "tipo": "Gasto"},
    {"palabra_clave": "marketing",        "categoria": "Comercial",       "tipo": "Gasto"},
    {"palabra_clave": "publicidad",       "categoria": "Comercial",       "tipo": "Gasto"},
    {"palabra_clave": "linkedin",         "categoria": "Comercial",       "tipo": "Gasto"},
    # Administración / SaaS
    {"palabra_clave": "spotify",          "categoria": "Administración",  "tipo": "Gasto"},
    {"palabra_clave": "netflix",          "categoria": "Administración",  "tipo": "Gasto"},
    {"palabra_clave": "suscripcion",      "categoria": "Administración",  "tipo": "Gasto"},
    {"palabra_clave": "notaria",          "categoria": "Administración",  "tipo": "Gasto"},
    {"palabra_clave": "asesoria",         "categoria": "Administración",  "tipo": "Gasto"},
    {"palabra_clave": "gestoria",         "categoria": "Administración",  "tipo": "Gasto"},
    {"palabra_clave": "comision banco",   "categoria": "Administración",  "tipo": "Gasto"},
    # Financieros
    {"palabra_clave": "prestamo",         "categoria": "Financieros",     "tipo": "Gasto"},
    {"palabra_clave": "hipoteca",         "categoria": "Financieros",     "tipo": "Gasto"},
    {"palabra_clave": "interes",          "categoria": "Financieros",     "tipo": "Gasto"},
    {"palabra_clave": "cuota",            "categoria": "Financieros",     "tipo": "Gasto"},
    # Ingresos genéricos
    {"palabra_clave": "transferencia recibida", "categoria": "Ingresos",  "tipo": "Ingreso"},
    {"palabra_clave": "cobro",            "categoria": "Ingresos",        "tipo": "Ingreso"},
    {"palabra_clave": "stripe",           "categoria": "Ingresos",        "tipo": "Ingreso"},
    {"palabra_clave": "paypal",           "categoria": "Ingresos",        "tipo": "Ingreso"},
]


class RulesEngine:
    """
    Motor de clasificación de movimientos.
    Primero aplica las reglas personalizadas del usuario (BBDD).
    Si no hay coincidencia, cae en las reglas semilla genéricas.
    """

    @staticmethod
    def clasificar_movimiento(
        concepto: str,
        importe: float,
        reglas_usuario: Optional[List[Regla]] = None
    ) -> str:
        """
        Clasifica un movimiento devolviendo su categoría.

        Args:
            concepto:       Texto del movimiento.
            importe:        Valor numérico (positivo = ingreso, negativo = gasto).
            reglas_usuario: Lista de objetos Regla del usuario (de la BBDD).
        """
        tipo_actual = "Ingreso" if importe >= 0 else "Gasto"
        concepto_lower = str(concepto).lower()

        # 1. Reglas personalizadas del usuario (prioridad máxima)
        if reglas_usuario:
            for regla in reglas_usuario:
                # Si la regla tiene tipo, solo aplica si coincide con el tipo actual
                if regla.tipo and regla.tipo != tipo_actual:
                    continue
                if regla.palabra_clave.lower() in concepto_lower:
                    return regla.categoria

        # 2. Fallback: reglas semilla genéricas
        for regla in REGLAS_SEMILLA:
            if regla["tipo"] and regla["tipo"] != tipo_actual:
                continue
            if regla["palabra_clave"].lower() in concepto_lower:
                return regla["categoria"]

        # 3. Sin coincidencia
        return "Ingresos" if importe >= 0 else "Otros"
