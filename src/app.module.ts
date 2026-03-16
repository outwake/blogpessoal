import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { Postagem } from './postagem/entities/postagem.entity';
import { TemaModule } from './tema/tema.module';
import { Tema } from './tema/entities/tema.entity';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';


@Module({
  //Criação da conexão com o banco de dados
  imports: [ ConfigModule.forRoot(),
  TypeOrmModule.forRootAsync({
	useClass: ProdService,
  imports: [ConfigModule],
  }),
  
  TypeOrmModule.forRoot({
  //Synchronize é para sincronizar as funções, em produção deixamos a opção em false
    synchronize: true,
    logging: true,
  }),
  PostagemModule, TemaModule, AuthModule, UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
