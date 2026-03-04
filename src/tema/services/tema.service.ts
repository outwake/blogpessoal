import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";
import { DeleteResult } from "typeorm/browser";



@Injectable()

export class TemaService{

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>,
    ){}

    //Listar todos os temas
    async findAll(): Promise<Tema[]>{
    // SELECT * FROM tb_temas;    
        return this.temaRepository.find({
            relations:{
                postagem:true
            }
        });
    }

    // Listar por ID
    async findById(id: number): Promise<Tema>{
        // SELECT * FROM tb_temas WHERE id = ?;
        const tema = await this.temaRepository.findOne({
            where: {
                id
            },
            relations:{
                postagem:true
            }
        })

        if(!tema)
           throw new HttpException("Tema não encontrado!", HttpStatus.NOT_FOUND)  

        return tema;
    }

    //Listar todos os Temas dessa descrição
    async findAllByDescricao(descricao: string): Promise<Tema[]>{
        return this.temaRepository.find({
            where:{
                descricao: ILike(`%${descricao}%`)
            },
            relations:{
                postagem:true
            }
        })
    }


    async create (tema: Tema): Promise<Tema>{
    //INSERT INTO tb_temas (descricao) VALUE(?)
        return await this.temaRepository.save(tema);
    }

    //Atualizar o Tema
    async update(tema: Tema): Promise<Tema>{
        if(!tema.id || tema.id <= 0)
            throw new HttpException("O Id do Tema não é válido!!", HttpStatus.BAD_REQUEST);

        await this.findById(tema.id);
        //UPDATE tb_tema SET descricao ? WHERE id = ?;
        return await this.temaRepository.save(tema);

    }

    async delete( id: number): Promise<DeleteResult>{
        await this.findById(id);

        //DELETE tb_tema FROM id = ?
        return this.temaRepository.delete(id);
    }

}