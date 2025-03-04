/**
 * Representa a un usuario en el sistema.
 *
 * Esta interfaz define la estructura básica de un usuario, incluyendo su
 * nombre de usuario y contraseña. El campo `id` es opcional y se utiliza
 * cuando el usuario ya está registrado en el sistema.
 *
 * @example
 * const user: User = {
 *   username: 'john_doe',
 *   password: 'securePassword123'
 * };
 */
export interface User {
  /**
   * Identificador único del usuario.
   *
   * Este campo es opcional y se asigna cuando el usuario ya está registrado en el sistema.
   *
   * @example 1
   */
  id?: number;

  /**
   * Nombre de usuario del usuario.
   *
   * Este campo es obligatorio y debe contener un nombre único para identificar al usuario.
   *
   * @example 'john_doe'
   */
  username: string;

  /**
   * Contraseña del usuario.
   *
   * Este campo es obligatorio y debe contener una cadena de caracteres segura para autenticar al usuario.
   *
   * @example 'securePassword123'
   */
  password: string;
}
