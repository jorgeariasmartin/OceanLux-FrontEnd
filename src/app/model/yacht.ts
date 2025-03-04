/**
 * Representa un yate en el sistema.
 *
 * Esta interfaz define la estructura de un yate, incluyendo su nombre, modelo,
 * imagen, descripción y capacidad. El campo `id` es opcional y es utilizado
 * cuando el yate ya está registrado en el sistema.
 *
 * @example
 * const yacht: Yacht = {
 *   name: 'Super Yacht',
 *   model: '2023',
 *   image: 'image_url',
 *   description: 'Un yate de lujo con todas las comodidades.',
 *   capacity: 50
 * };
 */
export interface Yacht {
  /**
   * Identificador único del yate.
   *
   * Este campo es opcional y se asigna cuando el yate ya está registrado en el sistema.
   *
   * @example 1
   */
  id?: number;

  /**
   * Nombre del yate.
   *
   * Este campo es obligatorio.
   *
   * @example 'Super Yacht'
   */
  name: string;

  /**
   * Modelo del yate.
   *
   * Este campo es obligatorio.
   *
   * @example '2023'
   */
  model: string;

  /**
   * URL de la imagen del yate.
   *
   * Este campo es obligatorio y debe contener la dirección de la imagen del yate.
   *
   * @example 'image_url'
   */
  image: string;

  /**
   * Descripción del yate.
   *
   * Este campo es obligatorio y proporciona información adicional sobre el yate.
   *
   * @example 'Un yate de lujo con todas las comodidades.'
   */
  description: string;

  /**
   * Capacidad máxima de personas que puede transportar el yate.
   *
   * Este campo es opcional y puede ser nulo si no se conoce la capacidad.
   *
   * @example 50
   */
  capacity: number | null;
}
