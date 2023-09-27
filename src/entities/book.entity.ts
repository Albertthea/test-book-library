import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: string | undefined;

  @Column()
  title: string | undefined;

  @Column()
  author: string | undefined;

  @Column()
  description: string | undefined;

  @Column()
  genre: string | undefined;

  @Column()
  language: string | undefined;

  @Column()
  pageCount: number | undefined;
}
