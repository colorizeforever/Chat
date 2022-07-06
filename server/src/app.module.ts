import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import mongoConfig from './config/config.db'
import { MongooseModule } from "@nestjs/mongoose";
import { ChatModule } from "./modules/chat/chat.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from "./modules/gridFS/file.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ChatModule,
    MongooseModule.forRoot(mongoConfig.chat.connection),
    AuthModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
