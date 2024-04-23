import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { SharedModule } from './shared/shared.module';
import { Configuration } from './config/config.keys';
import { ConfigService } from './config/config.service';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UserModule, RoleModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;
 
  constructor(private readonly _configService: ConfigService){
    console.log('Port: ', this._configService.get(Configuration.PORT));
    AppModule.port = this._configService.get(Configuration.PORT);
  }
  
}
