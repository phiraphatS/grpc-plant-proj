import { Module } from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantController } from './plant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from 'src/_entities/plant.entity';
import { MastAction } from 'src/_entities/mast_action.entity';
import { MastMood } from 'src/_entities/mast_mood.entity';
import { PlantMood } from 'src/_entities/plant_mood.entity';
import { MoodLevelStage } from 'src/_entities/mood_level_stage.entity';
import { EventLog } from 'src/_entities/event_log.entity';

@Module({
  controllers: [PlantController],
  imports: [
    TypeOrmModule.forFeature([
      Plant,
      MastAction,
      MastMood,
      PlantMood,
      MoodLevelStage,
      EventLog,
    ])
  ],
  exports: [PlantService],
  providers: [PlantService],
})
export class PlantModule {}
