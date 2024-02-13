"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const os = require("os");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.GRPC,
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
