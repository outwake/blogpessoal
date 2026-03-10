import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name: "tb_postagens"}) // É equivalente a CREATE TABLE tb_postagens

export class Postagem{
    //CRIAÇÃO ID
    @PrimaryGeneratedColumn() //PRIMARY KEY(id) AUTO INCREMENT
    id: number;

    //CRIAÇÃO TITULO
    @Transform(({ value } : TransformFnParams) => value?.trim())// Removendo os espaço em branco do começo e do fim, do meio não
    @IsNotEmpty()// Força a digitação
    @Column({length: 100, nullable: false}) // VARCHAR(100) NOT NULL
    titulo: string;

    //CRIAÇÃO TEXTO
    @Transform(({ value } : TransformFnParams) => value?.trim())// Removendo os espaço em branco do começo e do fim, do meio não
    @IsNotEmpty()// Força a digitação
    @Column({length: 1000, nullable: false}) // VARCHAR(100) NOT NULL
    texto: string;

    //CRIAÇÃO DATA
    @UpdateDateColumn()
    data: Date;

    //Relacionamento com tema
    @ManyToOne(() => Tema, (tema) => tema.postagem,{
        onDelete: "CASCADE"
    })
    tema: Tema;

      //Relacionamento com tema
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem,{
        onDelete: "CASCADE"
    })
    usuario: Usuario;
}