import {Yacht} from './yacht';

/**
 * Representa un viaje en el sistema.
 *
 * Esta interfaz define la estructura de un viaje, incluyendo detalles como el nombre del
 * viaje, la fecha de salida, el precio, la duración, la descripción, y el yate asociado al viaje.
 *
 * @example
 * const trip: Trip = {
 *   name: 'Tour por el Caribe',
 *   departure: 'Puerto de Miami',
 *   price: 1500,
 *   duration_hours: 12,
 *   description: 'Un increíble tour por las aguas cristalinas del Caribe.',
 *   startdate: '2025-06-01T08:00:00',
 *   enddate: '2025-06-01T20:00:00',
 *   yacht: {
 *     name: 'Ocean Breeze',
 *     model: 'Luxury 3500',
 *     image: 'url-to-image',
 *     description: 'Un yate de lujo con todas las comodidades.',
 *     capacity: 30
 *   }
 * };
 */
export interface Trip {
  /**
   * Identificador único del viaje.
   *
   * Este campo es opcional y se asigna cuando el viaje ya está registrado en el sistema.
   *
   * @example 1
   */
  id?: number;

  /**
   * Nombre del viaje.
   *
   * Este campo es obligatorio y debe contener el nombre que identifique el viaje.
   *
   * @example 'Tour por el Caribe'
   */
  name: string;

  /**
   * Lugar de salida del viaje.
   *
   * Este campo es obligatorio y debe contener la ubicación desde donde parte el viaje.
   *
   * @example 'Puerto de Miami'
   */
  departure: string;

  /**
   * Precio del viaje.
   *
   * Este campo es obligatorio y debe contener el costo total del viaje.
   *
   * @example 1500
   */
  price: number;

  /**
   * Duración del viaje en horas.
   *
   * Este campo es obligatorio y debe indicar la duración total del viaje en horas.
   *
   * @example 12
   */
  duration_hours: number;

  /**
   * Descripción del viaje.
   *
   * Este campo es obligatorio y debe proporcionar una descripción detallada del viaje.
   *
   * @example 'Un increíble tour por las aguas cristalinas del Caribe.'
   */
  description: string;

  /**
   * Fecha y hora de inicio del viaje.
   *
   * Este campo es obligatorio y debe contener la fecha y hora de inicio del viaje en formato ISO 8601.
   *
   * @example '2025-06-01T08:00:00'
   */
  startdate: string;

  /**
   * Fecha y hora de finalización del viaje.
   *
   * Este campo es obligatorio y debe contener la fecha y hora de finalización del viaje en formato ISO 8601.
   *
   * @example '2025-06-01T20:00:00'
   */
  enddate: string;

  /**
   * Yate asociado al viaje.
   *
   * Este campo es obligatorio y debe contener un objeto de tipo `Yacht` que representa el yate utilizado para el viaje.
   *
   * @example
   * {
   *   name: 'Ocean Breeze',
   *   model: 'Luxury 3500',
   *   image: 'url-to-image',
   *   description: 'Un yate de lujo con todas las comodidades.',
   *   capacity: 30
   * }
   */
  yacht: Yacht;
}
