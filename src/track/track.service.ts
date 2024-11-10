import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Track, tracks, favorites } from '../interfaces/interfaces';
import { CreateTrackDto, UpdateTrackDto } from './dto/track.dto';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  createTrack(dto: CreateTrackDto) {
    const track: Track = {
      id: v4(),
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId,
      albumId: dto.albumId,
    };
    tracks.push(track);
    return track;
  }

  getAllTracks(): Track[] {
    return tracks;
  }

  getTrackById(id: string): Track {
    const existedTrack = tracks.find((track) => track.id === id);

    if (existedTrack) {
      return existedTrack;
    } else {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  updateTrack(dto: UpdateTrackDto, id: string): Track {
    const existedTrack = tracks.find((track) => {
      if (track.id === id) {
        track.name = dto.name;
        track.duration = dto.duration;
        track.artistId = dto.artistId;
        track.albumId = dto.albumId;
        return true;
      }
    });

    if (existedTrack) {
      return existedTrack;
    } else {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
  }

  deleteTrack(id: string) {
    const existedTrack = tracks.find((track, ind) => {
      if (track.id === id) {
        tracks.splice(ind, 1);
        favorites.tracks = favorites.tracks.filter((elem) => elem !== id);
        return true;
      }
    });

    if (!existedTrack) {
      throw new HttpException("Track doesn't exist", HttpStatus.NOT_FOUND);
    }
  }
}
