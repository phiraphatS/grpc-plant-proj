import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as os from 'os';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    // options: {
    //   package: 'plant',
    //   protoPath: join(__dirname, 'proto/*.proto'),
    // },
  });

  // app.setGlobalPrefix('api');
  // const port = process.env.PORT || 5001;
  // await app.listen(port);
  console.log(`Platform                   : ${process.platform}`);
  // console.log(`Server started on port    : ${port}`);
  // console.log(`API URL                   : http://localhost:${port}/api`);
  console.log(`Server running on hostname : ${os.hostname()}`);
}
bootstrap();
