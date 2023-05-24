import { IMessage } from './types';

export class Messages {
  static readonly PREFIX = 'application.message';
  static readonly SCOPE_ERROR = `${this.PREFIX}.error`;
  static readonly SCOPE_NOTIFICATION = `${this.PREFIX}.notification`;

  static readonly Errors: Record<string, string> = {
    MISSING_AUTHORIZATION_HEADER: 'missing_authorization_header',
    INVALID_JWT_TYPE: 'invalid_jwt_type',
    INVALID_JWT: 'invalid_jwt',
    INVALID_SIGN_IN_CREDENTIAL: 'invalid_signin_credential',
  };

  static readonly Notifications: Record<string, IMessage> = {};

  static readonly ErrorKeys = Object.keys(this.Errors);
  static readonly NotificationKeys = Object.keys(this.Notifications);
}
