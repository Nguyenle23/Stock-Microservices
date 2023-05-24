import { Authentication, FullAuthorizationRoles } from '@/common';
import { ApplicationIOServerComponent, MarketPriceComponent } from '@/components';
import { App, AuthenticateComponent, AuthenticateKeys, AuthorizeComponent, AuthorizerKeys, DefaultRestApplication, JWTTokenService, PostgresDataSource } from '@lb/infra';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings, RestExplorerComponent
} from '@loopback/rest-explorer';
import path from 'path';

export { ApplicationConfig };

export class StockApplication extends DefaultRestApplication {
  constructor(options: ApplicationConfig = {}) {
    super(options);
  }

  preConfigure(): void {
    super.preConfigure();

    // Repositories
    this.configureRepositories();

    // Services
    this.configureServices();

    // Security
    this.configureSecurity();

    if (process.env.RUN_MODE === 'migrate') {
      return;
    }
  }

  configureSecurity() {
    // Configuring components
    this.bind(AuthenticateKeys.APPLICATION_SECRET).to(App.SECRET);
    this.bind(AuthenticateKeys.TOKEN_OPTIONS).to({
      tokenSecret: Authentication.ACCESS_TOKEN_SECRET,
      tokenExpiresAt: Authentication.ACCESS_TOKEN_EXPIRES_IN,
      refreshSecret: Authentication.REFRESH_TOKEN_SECRET,
      refreshExpiresIn: Authentication.REFRESH_TOKEN_EXPIRES_IN,
    });

    this.bind(AuthorizerKeys.AUTHORIZE_DATASOURCE).toInjectable(PostgresDataSource);
    this.component(AuthorizeComponent);
    this.component(AuthenticateComponent);

    this.bind(AuthorizerKeys.ALWAYS_ALLOW_ROLES).to([FullAuthorizationRoles.SUPER_ADMIN, FullAuthorizationRoles.ADMIN]);
    this.bind(AuthorizerKeys.CONFIGURE_OPTIONS).to({
      confPath: path.resolve(__dirname, '../static/security/authorize_model.conf'),
      useCache: false,
    });
  }

  configureRepositories() {}

  configureServices() {
    this.service(JWTTokenService);
  }

  staticConfigure(): void {
    this.static('/', path.join(__dirname, '../public'));
  }

  getProjectRoot(): string {
    return __dirname;
  }

  declareModels(): Set<string> {
    return this.models;
  }

  postConfigure(): void {
    // Explorer
    this.configure(RestExplorerBindings.COMPONENT).to({ path: '/explorer' });
    this.component(RestExplorerComponent);
    this.component(ApplicationIOServerComponent);
    this.component(MarketPriceComponent)
  }
}
