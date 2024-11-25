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
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAll() {
    const artists = await this.artistService.getAll();
    return artists.map((artist) => new ArtistEntity(artist));
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.getById(id);
    return new ArtistEntity(artist);
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    const artist = await this.artistService.create(createArtistDto);
    return new ArtistEntity(artist);
  }

  @Put(':id')
  async update(
    @Body() updateArtist: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const artist = await this.artistService.update(updateArtist, id);
    return new ArtistEntity(artist);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.artistService.delete(id);
  }
}
