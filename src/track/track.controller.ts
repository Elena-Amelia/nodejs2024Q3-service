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
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { TrackEntity } from './entities/track.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAll() {
    const tracks = await this.trackService.getAll();
    return tracks.map((track) => new TrackEntity(track));
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.getById(id);
    return new TrackEntity(track);
  }

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto) {
    const track = await this.trackService.create(createTrackDto);
    return new TrackEntity(track);
  }

  @Put(':id')
  async update(
    @Body() updateTrack: UpdateTrackDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const track = await this.trackService.update(updateTrack, id);
    return new TrackEntity(track);
  }
  
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.trackService.delete(id);
  }
}
