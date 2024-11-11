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
import { TrackService } from './track.service';
import { Track } from '../interfaces/interfaces';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll(): Track[] {
    return this.trackService.getAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string): Track {
    return this.trackService.getById(id);
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }
  @Put(':id')
  update(
    @Body() updateTrack: UpdateTrackDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Track {
    return this.trackService.update(updateTrack, id);
  }
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.delete(id);
  }
}
