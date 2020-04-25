import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { GridFsMulterConfigService } from './multer-config.service';
import { FilesService } from './files.service';
import { DatabaseModule } from '../database.module';
import { filesProviders } from './files.providers';
import { FilesController } from './files.controller';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  providers: [
    GridFsMulterConfigService,
    FilesService,
    ...filesProviders,
  ],
  controllers: [FilesController],
  exports: [
    FilesService,
  ],
})
export class FilesModule {
}
