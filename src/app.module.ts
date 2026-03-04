import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { Postagem } from './postagem/entities/postagem.entity';
import { TemaModule } from './tema/tema.module';
import { Tema } from './tema/entities/tema.entity';


@Module({
  //Criação da conexão com o banco de dados
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_blogpessoal',
    entities: [Postagem, Tema],
    //Synchronize é para sincronizar as funções, em produção deixamos a opção em false
    synchronize: true,
    logging: true,
  }),
  PostagemModule, TemaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
