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
  import { TrackService } from './track.service';
  import { Track } from '../interfaces/interfaces';
  import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
  
  @Controller('track')
  export class TrackController {
    constructor(private readonly trackService: TrackService) {}
  
    @Get()
    getAll(): Track[] {
      return this.trackService.getAllTracks();
    }
  
    @Get(':id')
    getById(@Param('id', new ParseUUIDPipe()) id: string): Track {
      return this.trackService.getTrackById(id);
    }
  
    @Post()
    create(@Body() createTrackDto: CreateTrackDto) {
      return this.trackService.createTrack(createTrackDto);
    }
    @Put(':id')
    update(
      @Body() updateTrack: UpdateTrackDto,
      @Param('id', new ParseUUIDPipe()) id: string,
    ): Track {
      return this.trackService.updateTrack(updateTrack, id);
    }
    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id', new ParseUUIDPipe()) id: string) {
      return this.trackService.deleteTrack(id);
    }
  }
  