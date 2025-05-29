import { Pais } from 'src/paises/entities/pais.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Series {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_pais' })
  idPais: number;

  @Column('varchar', { length: 250 })
  titulo: string;

  @Column('varchar', { length: 5000 })
  sinopsis: string;

  @Column('varchar', { length: 100 })
  director: string;

  @Column({ type: 'int' })
  temporadas: number;

  @Column({ type: 'date', name: 'fecha_estreno' })
  fechaEstreno: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCeacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Pais, (pais) => pais.series)
  @JoinColumn({ name: 'id_pais', referencedColumnName: 'id' })
  paises: Pais;
}
