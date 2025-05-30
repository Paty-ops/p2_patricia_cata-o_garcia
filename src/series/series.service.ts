import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Series } from './entities/series.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series) private seriesRepository: Repository<Series>,
  ) {}

  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    const existe = await this.seriesRepository.findOneBy({
      titulo: createSeriesDto.titulo.trim(),
    });

    if (existe) throw new ConflictException('La Serie ya existe');

    const series = new Series();
    series.idPais = createSeriesDto.idPais;
    series.titulo = createSeriesDto.titulo.trim();
    series.sinopsis = createSeriesDto.sinopsis.trim();
    series.director = createSeriesDto.director.trim();
    series.idiomaPrincipal = createSeriesDto.idiomaPrincipal.trim();
    series.temporadas = createSeriesDto.temporadas;
    series.fechaEstreno = createSeriesDto.fechaEstreno;
    return this.seriesRepository.save(series);
  }

  async findAll() {
    return this.seriesRepository.find();
  }

  async findOne(id: number): Promise<Series> {
    const serie = await this.seriesRepository.findOneBy({ id });
    if (!serie) throw new NotFoundException('La serie no existe');
    return serie;
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto) {
    const serie = await this.findOne(id);
    const serieUpdate = Object.assign(serie, updateSeriesDto);
    return this.seriesRepository.save(serieUpdate);
  }

  async remove(id: number) {
    const serie = await this.findOne(id);
    if (serie) return this.seriesRepository.softRemove(serie);
  }
}
