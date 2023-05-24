export const DEFAULT_LOCALE = 'en.UTF-8';

export class App {
    static readonly APPLICATION_NAME = process.env.APP_ENV_APPLICATION_NAME;
}

export class ApplicationKeys {
    static readonly DS_POSTGRES = 'postgres';
}

export class AuthenticationProviders {
    static readonly STOCK = 'stock';
    static readonly TYPE_SET = new Set([this.STOCK]);

    static isValid(orgType: string): boolean {
        return this.TYPE_SET.has(orgType);
    }
}

export class RestPaths {
    static readonly STREAM: string = '/stream';
}

export class Statuses {
    static readonly ACTIVATED = '100_ACTIVATED';
    static readonly DEACTIVATED = '101_DEACTIVATED';
    static readonly BLOCKED = '102_BLOCKED';
    static readonly ARCHIVE = '103_ARCHIVE';
    static readonly SENT = '104_SENT';

    static readonly DRAFT = '200_DRAFT';
    static readonly PUBLISHED = '201_PUBLISHED';
    static readonly EXPIRED = '202_EXPIRED';
    static readonly SOLD_OUT = '203_SOLD_OUT';

    static readonly PENDING = '300_PENDING';
    static readonly SENDING = '301_SENDING';
    static readonly COMPLETED = '302_COMPLETED';
    static readonly CANCELLED = '303_CANCELLED';
    static readonly FAIL = '304_FAIL';
    static readonly TIMEOUT = ' 305_TIMEOUT';

    static readonly UNKNOWN = '400_UNKNOWN';
    static readonly SUCCESS = '401_SUCCESS';
    static readonly VISITED = '700_VISITED';
    static readonly ARCHIVED = '800_ARCHIVED';

    static readonly SAMPLES = '500_SAMPLES';
    static readonly ON_SALE = '501_ON_SALE';
    static readonly TO_BE_DISCONTINUED = '502_TO_BE_DISCONTINUED';
    static readonly DISCONTINUED = '504_DISCONTINUED';
}

export class MigrationStatuses {
    static readonly UNKNOWN = Statuses.UNKNOWN;
    static readonly SUCCESS = Statuses.SUCCESS;
    static readonly FAIL = Statuses.FAIL;
}

export class Authentication {
    static readonly ACCESS_TOKEN_SECRET = 'stock';
    static readonly ACCESS_TOKEN_EXPIRES_IN = 86400;
    static readonly REFRESH_TOKEN_SECRET = 'stock';
    static readonly REFRESH_TOKEN_EXPIRES_IN = 86400;

    // Jwt
    static readonly TYPE_BASIC = 'Basic';
    static readonly TYPE_BEARER = 'Bearer';

    // Strategy
    static readonly STRATEGY_BASIC = 'basic';
    static readonly STRATEGY_JWT = 'jwt';
}

export class FullAuthorizationRoles {
    static readonly SUPER_ADMIN = '999-super-admin';
    static readonly ADMIN = '998-admin';
}