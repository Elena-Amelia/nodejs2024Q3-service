import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from '../interfaces/interfaces';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/Album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  getAll(): Album[] {
    return this.albumService.getAllAlbums();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string): Album {
    return this.albumService.getAlbumById(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }
  @Put(':id')
  update(
    @Body() updateAlbum: UpdateAlbumDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Album {
    return this.albumService.updateAlbum(updateAlbum, id);
  }
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
