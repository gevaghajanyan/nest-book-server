import { Controller, Get, HttpException, HttpStatus, Inject, Param, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';

@ApiTags('files')
@Controller('files')
export class FilesController {
  @Inject()
  private readonly filesService: FilesService;

  @ApiParam({
    required: true,
    name: 'id',
    type: String,
  })
  @Get(':id')
  public async getFile(
    @Param('id')id: string,
    @Res() res,
  ) {
    return await this.filesService.readStream(id,res);
  }
}