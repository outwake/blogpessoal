import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";


@Entity({name: "tb_temas"})

export class Tema{
    //CRIAÇÃO DO ID
    @PrimaryGeneratedColumn()
    id: number;


    //CRIAÇÃO DA DESCRIÇÃO DO TEMA
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    descricao: string;

    //Relacionamento com postagem
    @OneToMany(() => Postagem, (postagem)=> postagem.tema)
    postagem: Postagem[];
}