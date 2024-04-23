import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from 'src/config/config.keys';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { ConnectionOptions } from 'typeorm';

  export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService){
            return {
              ssl: false,
              type: 'postgres' as 'postgres',
              //type: 'postgres' as 'postgres'
              username: config.get(Configuration.USERNAME),
              password: config.get(Configuration.PASSWORD),
              host: config.get(Configuration.HOST),
              port: parseInt(process.env.DB_PORT),
              database: config.get(Configuration.DATABASE),
              entities: [__dirname + '/../**/*.entity{.ts,.js}'],
              migrations: [__dirname + '/migrations/*{.ts,.js}'],
              autoLoadEntities: true,
              synchronize: !!process.env.DB_SYNC
            } as ConnectionOptions;
        }
    })

]

