import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentVariables } from '../config/environment-variables.interface';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>
      ) => ({
        secret: configService.get('NX_JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get(
            'NX_JWT_ACCESS_TOKEN_EXPIRATION_TIME'
          )}s`,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
