import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemService } from "../services/postagem.service";
import { Postagem } from "../entities/postagem.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";


@UseGuards(JwtAuthGuard)
@Controller("/postagens")
export class PostagemController{

    constructor(
        private readonly postagemService: PostagemService
    ){}


    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll():Promise<Postagem[]>{
        return this.postagemService.findAll();
    }

    
    @Get('/:id')// "/:id" indica que é uma variavel
    @HttpCode(HttpStatus.OK)// Status de OK
    findById(@Param('id', ParseIntPipe) id: number):Promise<Postagem>{
        return this.postagemService.findById(id);
    }

    @Get('/titulo/:titulo')// "/:id" indica que é uma variavel
    @HttpCode(HttpStatus.OK)// Status de OK
    findAllByTitulo(@Param('titulo') titulo: string):Promise<Postagem[]>{
        return this.postagemService.findAllByTitulo(titulo); 
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem>{ //Body é para colocar no corpo da postagem
        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem>{ //Body é para colocar no corpo da postagem
        return this.postagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id', ParseIntPipe) id:number){
        return this.postagemService.delete(id)
    }

}