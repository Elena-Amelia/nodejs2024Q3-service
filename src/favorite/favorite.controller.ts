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
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeTrack(id);
  }
  @Post('track/:id')
  createArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.createArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeArtist(id);
  }
  @Post('track/:id')
  createAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.createAlbum(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeAlbum(id);
  }
}
