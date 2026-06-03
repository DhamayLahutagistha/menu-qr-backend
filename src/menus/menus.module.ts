// src/menus/menus.module.ts
import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [UploadModule],
  providers: [MenusService],
  controllers: [MenusController],
})
export class MenusModule {}