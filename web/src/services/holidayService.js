// web/src/services/holidayService.js

const API_URL = 'https://brasilapi.com.br/api/feriados/v1/';

/**
 * Busca os feriados nacionais para um determinado ano.
 * @param {number} year - O ano para o qual buscar os feriados.
 */
export async function getHolidaysForYear(year) {
  try {
    const response = await fetch(`${API_URL}${year}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar feriados da BrasilAPI');
    }
    const data = await response.json();
    return data; // Retorna a lista de feriados
  } catch (error) {
    console.error("Falha em getHolidaysForYear:", error);
    return []; // Retorna uma lista vazia em caso de erro.
  }
}