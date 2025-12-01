/**
 * Retorna las clases CSS para inputs (text, number, select, etc.)
 * @param {boolean} error - Si el campo tiene error (true/false)
 * @param {string} extraClasses - Clases adicionales opcionales
 * @returns {string} Cadena de clases CSS
 */
export const getInputClasses = (error, extraClasses = '') => {
	return `
        w-full p-3 rounded-xl bg-black/80 text-white 
        placeholder-gray-500 font-semibold 
        focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none
        transition shadow-[0_0_30px_rgba(255,0,0,0.45)]
        ${error ? 'border border-red-600' : 'border border-red-900'}
        ${extraClasses}
    `
		.trim()
		.replace(/\s+/g, ' ');
};

/**
 * Retorna las clases CSS para los mensajes de error debajo de los inputs
 * @param {string} extraClasses - Clases adicionales opcionales
 * @returns {string} Cadena de clases CSS
 */
export const getErrorClasses = (extraClasses = '') => {
	return `
        text-xs font-semibold text-red-400 
										bg-linear-to-r from-red-900/40 via-red-700/20 to-red-900/40
										border border-red-800/40 rounded-md px-2 py-1 mt-1 
										shadow-[0_0_8px_rgba(255,0,0,0.4)] tracking-wide animate-pulse
        ${extraClasses}
    `
		.trim()
		.replace(/\s+/g, ' ');
};

export const getLabelClasses = (extraClasses = '') => {
	return `
    text-[10px] font-bold text-white mb-1 ml-1 uppercase tracking-wider ${extraClasses}
    `
		.trim()
		.replace(/\s+/g, ' ');
};
