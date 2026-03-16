import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request = require('supertest');
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Testes dos Módulos Usuário e Auth (e2e)', () => {

  let token: any;

  let usuarioId: any;

  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities:[__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true, //toda vez que for executar os testes, ele apaga a tabela e cria de novo
          logging: false,

        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async ()=>{
   await app.close();
  })

  it('01 Deve cadastrar um novo usuario', async() => {
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    
    .send({
      nome: 'Root', 
      usuario: 'root@root.com.br',
      senha: 'rootroot',
      foto: '-',
    })
    expect(resposta.status).toBe(201);// uma forma de expect

    usuarioId = resposta.body.id;
  });

  it('02 Não deve cadastrar um usuario repetido', async() => {
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/cadastrar')
    .send({
      nome: 'Root', 
      usuario: 'root@root.com.br',
      senha: 'rootroot',
      foto: '-',
    })
    .expect(400);

    
  });

  it('03 Deve Autenticar um usuário cadastrado', async() => {
    const resposta = await request(app.getHttpServer())
    .post('/usuarios/logar')
    .send({
      usuario: 'root@root.com.br',
      senha: 'rootroot',
    })
    .expect(200);

    token = resposta.body.token;
  });

  it('04 Listar todos', async() => {
    const resposta = await request(app.getHttpServer())
    .get('/usuarios/all')
    .set('Authorization', `${token}`)
    .expect(200);

  });

  it('05 Deve atualizar usuário já existente', async() => {
    const resposta = await request(app.getHttpServer())
    .put('/usuarios/atualizar')
    .set('Authorization', `${token}`)
    .send({
      id: usuarioId,
      nome: 'Root Ataulizado',
      usuario: 'root@root.com.br',
      senha: 'rootroot',
    })
    
    .expect(200);
  });

   it('06 Listar por ID', async() => {
    const resposta = await request(app.getHttpServer())
    .get(`/usuarios/${usuarioId}`)
    .set('Authorization', `${token}`)
    .expect(200);

    expect(resposta.body.id).toEqual(usuarioId);

  });

  it('07 Não achar por ID', async() => {
    const resposta = await request(app.getHttpServer())
    .get('/usuarios/99999')
    .set('Authorization', `${token}`)
    .expect(404);
  });

});
