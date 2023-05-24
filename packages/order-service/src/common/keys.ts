import { BindingKey } from '@loopback/core';

export class BindingKeys {
  // -------------------------------------------------------------------------------------
  static readonly APPLICATION_INSTANCE = '@stock/application';
  static readonly APPLICATION_ROOT_CONTEXT = '@stock/context/root';
  static readonly APPLICATION_ENVIRONMENTS = '@stock/application/environments';

  // -------------------------------------------------------------------------------------
  static readonly AUTHORIZATION_PROVIDER = '@stock/application/authorization/provider';
  static readonly ENFORCER_ADAPTER = BindingKey.create('@stock/application/authorization/enforcer-adapter');
  static readonly ENFORCER_FACTORY = BindingKey.create('@stock/application/authorization/enforcer-factory');
}

export namespace LoggerBindings {
  export const LOGGER = BindingKey.create('@stock/binding/application-logger-instance');
  export const LOGGER_FACTORY = BindingKey.create('@stock/binding/application-logger-factory');
}
