export const diaEnPeriodo = (date, period) => {
	const now = new Date();
	const target = new Date(date);

	// Función para resetear la hora a medianoche (para comparaciones por día)
	const startOfDay = (d) => {
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	};

	const today = startOfDay(new Date(now));
	const targetDay = startOfDay(new Date(target));

	switch (period) {
		case 'Turno': // Definir la hora de corte (6 AM) // 🚨 NUEVA OPCIÓN: Día Operativo (Corte a las 6:00 AM)
		{
			const CUTOFF_HOUR = 6;

			// Determinar el inicio del turno operativo ACTUAL
			const shiftStart = new Date(now);

			// Si son las 00:00 - 05:59, estamos en el turno de "ayer" (noche anterior)
			// Si son las 06:00 - 23:59, estamos en el turno de "hoy"
			if (now.getHours() < CUTOFF_HOUR) {
				shiftStart.setDate(shiftStart.getDate() - 1);
			}

			// Configurar el inicio del turno a las 6:00 AM
			shiftStart.setHours(CUTOFF_HOUR, 0, 0, 0);

			// Configurar el fin del turno (inicio + 24h) -> 6:00 AM de mañana
			const shiftEnd = new Date(shiftStart);
			shiftEnd.setDate(shiftEnd.getDate() + 1);

			// Verificar si la fecha objetivo cae en este rango
			return (
				target.getTime() >= shiftStart.getTime() &&
				target.getTime() < shiftEnd.getTime()
			);
		}

		case 'Hoy':
			return targetDay === today;
		case 'Semana': // Definir el inicio de la semana (asumimos que la semana comienza el Lunes)
		{
			const startOfWeek = new Date(now);
			const dayOfWeek = (now.getDay() + 6) % 7; // 0=Lunes, 6=Domingo
			startOfWeek.setDate(now.getDate() - dayOfWeek);
			startOfWeek.setHours(0, 0, 0, 0);

			// Definir el fin de la semana (Domingo a las 23:59:59)
			const endOfWeek = new Date(startOfWeek);
			endOfWeek.setDate(startOfWeek.getDate() + 7);

			return (
				target.getTime() >= startOfWeek.getTime() &&
				target.getTime() < endOfWeek.getTime()
			);
		}
		case 'Mes':
			// Comparar año y mes
			return (
				target.getFullYear() === now.getFullYear() &&
				target.getMonth() === now.getMonth()
			);
		default:
			return true; // Si no hay filtro, incluye todo
	}
};
