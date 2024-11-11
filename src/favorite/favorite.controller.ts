import {
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorite.service';
import { FavoritesResponse } from '../interfaces/interfaces';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll(): FavoritesResponse {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  createTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.createTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteTrack(id);
  }
  @Post('artist/:id')
  createArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.createArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteArtist(id);
  }
  @Post('album/:id')
  createAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.createAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteAlbum(id);
  }
}
