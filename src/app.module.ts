import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { Postagem } from './postagem/entities/postagem.entity';


@Module({
  //Criação da conexão com o banco de dados
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_blogpessoal',
    entities: [Postagem],
    //Synchronize é para sincronizar as funções, em produção deixamos a opção em false
    synchronize: true,
  }),
  PostagemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
