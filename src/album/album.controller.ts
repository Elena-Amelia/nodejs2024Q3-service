import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { AlbumEntity } from './entities/album.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async getAll() {
    const albums = await this.albumService.getAll();
    return albums.map((album) => new AlbumEntity(album));
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.getById(id);
    return new AlbumEntity(album);
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const album = await this.albumService.create(createAlbumDto);
    return new AlbumEntity(album);
  }
  
  @Put(':id')
  async update(
    @Body() updateAlbum: UpdateAlbumDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const album = await this.albumService.update(updateAlbum, id);
    return new AlbumEntity(album);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumService.delete(id);
  }
}
