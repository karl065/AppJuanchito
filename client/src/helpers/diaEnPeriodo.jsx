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
		case 'Hoy':
			return targetDay === today;
		case 'Semana': { // Definir el inicio de la semana (asumimos que la semana comienza el Lunes)
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
