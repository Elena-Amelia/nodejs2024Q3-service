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
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from '../interfaces/interfaces';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistService.getAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string): Artist {
    return this.artistService.getById(id);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }
  @Put(':id')
  update(
    @Body() updateArtist: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Artist {
    return this.artistService.update(updateArtist, id);
  }
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.delete(id);
  }
}
