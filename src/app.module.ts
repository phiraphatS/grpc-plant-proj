import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantModule } from './module/plant/plant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Plant } from './_entities/plant.entity';
import { PlantMood } from './_entities/plant_mood.entity';
import { MoodLevelStage } from './_entities/mood_level_stage.entity';
import { MastAction } from './_entities/mast_action.entity';
import { MastMood } from './_entities/mast_mood.entity';
import { EventLog } from './_entities/event_log.entity';

@Module({
  imports: [
    PlantModule,
    ClientsModule.register([
      {
        name: 'PLANT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'plant',
          protoPath: 'src/proto/plant.proto',
        },
      },
    ]),
    TypeOrmModule.forRoot({
      ...require('../typeorm.config'),
      entities: [
        Plant,
        PlantMood,
        MoodLevelStage,
        MastAction,
        MastMood,
        EventLog,
      ]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
