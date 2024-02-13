import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventLog } from 'src/_entities/event_log.entity';
import { MastAction } from 'src/_entities/mast_action.entity';
import { MastMood } from 'src/_entities/mast_mood.entity';
import { MoodLevelStage } from 'src/_entities/mood_level_stage.entity';
import { Plant } from 'src/_entities/plant.entity';
import { PlantMood } from 'src/_entities/plant_mood.entity';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class PlantService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,
    @InjectRepository(EventLog)
    private eventLogRepository: Repository<EventLog>,
    @InjectRepository(MastAction)
    private mastActionRepository: Repository<MastAction>,
    @InjectRepository(MastMood)
    private mastMoodRepository: Repository<MastMood>,
    @InjectRepository(PlantMood)
    private plantMoodRepository: Repository<PlantMood>,
    @InjectRepository(MoodLevelStage)
    private moodLevelStageRepository: Repository<MoodLevelStage>,
  ) {}

  async findOne(id: number) {
    try {
      return this.plantRepository.findOneBy({
        id,
        isActive: 1,
        isDeleted: 0,
      });
    } catch (error) {
      throw error;
    }
  }

  async plantATree(userId: number, details: { name: string }) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newPlant = this.plantRepository.create()
      // grows 1 days from now
      const growsTime = new Date();
      const nextDate = growsTime.getDate() + 1
      growsTime.setDate(nextDate);

      newPlant.name = details.name;
      newPlant.growsTime = growsTime;
      newPlant.growsLevel = 1;
      newPlant.isAlive = 1;
      newPlant.isActive = 1;
      newPlant.isDeleted = 0;
      newPlant.createdDate = new Date();
      newPlant.modifiedDate = new Date();
      newPlant.createdBy = userId;
      newPlant.modifiedBy = userId;

      const mastMood = await this.mastMoodRepository.findBy({
        isActive: 1,
        isDeleted: 0,
      });

      if (mastMood.length === 0) {
        throw new Error('Mood not found');
      }

      const plantMoodList: PlantMood[] = [];
      const moodLevelStageList: MoodLevelStage[] = [];
      for (const mood of mastMood) {
        const plantMood = this.plantMoodRepository.create();
        plantMood.plantId = newPlant.id;
        plantMood.moodId = mood.id;
        plantMood.moodLevel = 1;
        plantMood.isPositive = mood.isPositive;
        plantMood.isActive = 1;
        plantMood.isDeleted = 0;
        plantMood.createdDate = new Date();
        plantMood.modifiedDate = new Date();
        plantMood.createdBy = userId;
        plantMood.modifiedBy = userId;
        plantMood.moodLevel = 1;

        plantMoodList.push(plantMood);

        const moodLevelStage = this.moodLevelStageRepository.create();
        moodLevelStage.moodLevel = 1;
        moodLevelStage.stage = 1;
        moodLevelStage.maxStage = 4;
        moodLevelStage.isActive = 1;
        moodLevelStage.isDeleted = 0;
        moodLevelStage.createdDate = new Date();
        moodLevelStage.modifiedDate = new Date();
        moodLevelStage.createdBy = userId;
        moodLevelStage.modifiedBy = userId;
        moodLevelStage.plantMood = plantMood;

        moodLevelStageList.push(moodLevelStage);
      }

      await queryRunner.manager.save(newPlant);
      await queryRunner.manager.save(plantMoodList);
      await queryRunner.manager.save(moodLevelStageList);
      await queryRunner.commitTransaction();

      return {
        status: true,
        message: 'Plant created successfully',
        results: null,
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async waterAPlant(userId: number, details: { plantId: number }) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const plant = await this.plantRepository.findOneBy({
        id: details.plantId,
        isActive: 1,
        isDeleted: 0,
      });

      if (!plant) {
        throw new Error('Plant not found');
      }

      const mastAction = await this.mastActionRepository.findOneBy({
        actionName: 'Watering',
        isActive: 1,
        isDeleted: 0,
      });

      if (!mastAction) {
        throw new Error('Action not found');
      }

      const eventLog = this.eventLogRepository.create();
      eventLog.eventName = mastAction.actionName;
      eventLog.actionId = mastAction.id;
      eventLog.actionAt = new Date();
      eventLog.isActive = 1;
      eventLog.isDeleted = 0;
      eventLog.createdDate = new Date();
      eventLog.modifiedDate = new Date();
      eventLog.createdBy = userId;
      eventLog.modifiedBy = userId;
      eventLog.plantId = plant.id;

      await queryRunner.manager.save(eventLog);
      await queryRunner.commitTransaction();

      return {
        status: true,
        message: 'Plant watered successfully',
        results: null,
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateMoodLevel() {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // All action have Watering, Sunlight, and Interactions
      // All mood have Happiness, Contentment, Gratitude, Resilience, Abundance, Withering, Sadness, Vulnerability, Dormancy
      /*
      * 1. Get all active and not deleted plant
      * 2. Get all active and not deleted mast mood
      * 3. Loop through plant
      * 4. Get all event log in 60 hour for the plant
      * 5. Happiness mood level increase by 1 if the plant has been Watered 3 times in 60 hour
      * 6. Contentment mood level increase by 1 if the plant has been Sunlight 2 times in 60 hour
      * 7. Gratitude mood level increase by 1 if the plant has been Watered 3 times and Sunlight 2 in 60 hour
      * 8. Resilience mood level increase by 1 if negative mood reduce by 1 in 24 hour
      * 9. Abundance mood level increase by 1 if the plant level is more than 2 and mood update in 24 hour
      * // the negative mood is Withering, Sadness, Vulnerability, Dormancy increase for poor care
      * 10. Withering mood level increase by 1 if the plant has not been Watered or Sunlight in 60 hour
      * 11. Sadness mood level increase by 1 if the plant has not been Interactions in 60 hour
      * 12. Vulnerability mood level increase by 1 if the plant has not been Sunlight in 60 hour
      * 13. Dormancy mood level increase by 1 if the other all negative mood level is more than 3
      * 14. Update the mood level
      * 15. Withering mood level decrease by 1 if the plant has been Watered or Sunlight in 60 hour and Resilience mood level increase by 1
      * 16. Sadness mood level decrease by 1 if the plant has been Interactions in 60 hour and Resilience mood level increase by 1
      * 17. Vulnerability mood level decrease by 1 if the plant has been Sunlight in 60 hour and Resilience mood level increase by 1
      * 18. Dormancy mood level decrease by 1 if the other all negative mood level is less than 3 and Resilience mood level increase by 1
      * 19. If Dormancy mood level is 5, the plant is dead
      */

      const plant = await this.plantRepository.findBy({
        isActive: 1,
        isDeleted: 0,
      });

      if (plant.length === 0) {
        throw new Error('Plant not found');
      }

      const mastMood = await this.mastMoodRepository.findBy({
        isActive: 1,
        isDeleted: 0,
      });

      if (mastMood.length === 0) {
        throw new Error('Mast mood not found');
      }

      const mastAction = await this.mastActionRepository.findBy({
        isActive: 1,
        isDeleted: 0,
      });

      if (mastAction.length === 0) {
        throw new Error('Mast action not found');
      }

      const currentTime = new Date();
      const sixtyHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);
      const twentyFourHourAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
      const twelveHourAgo = new Date(currentTime.getTime() - 12 * 60 * 60 * 1000);

      for (const p of plant) {
        const eventLog = await this.eventLogRepository.findBy({
          plantId: p.id,
          isActive: 1,
          isDeleted: 0,
        });

        const plantMood = await this.plantMoodRepository.find({
          where: {
            plantId: p.id,
            isActive: 1,
            isDeleted: 0,
          },
          relations: {
            moodLevelStage: true,
          }
        });

        if (eventLog.length === 0) {
          continue;
        }

        // 5. Happiness mood level increase by 1 if the plant has been Watered 3 times in 60 hour
        const actionWatered = mastAction.find((a) => a.actionName === 'Watering');
        const moodHappiness = mastMood.find((m) => m.mood === "Happiness");
        const watered = eventLog.filter((e) => e.actionId === actionWatered.id && e.actionAt > sixtyHourAgo);
        if (watered.length >= 3) {
          const targetMood = plantMood.find((m) => m.moodId === moodHappiness.id);
          const moodLevelStage = targetMood.moodLevelStage[0];
          if (moodLevelStage.modifiedDate > twelveHourAgo) {
            if (moodLevelStage.stage < moodLevelStage.maxStage) {
              moodLevelStage.stage += 1;
            } else {
              targetMood.moodLevel += 1;
              moodLevelStage.stage = 1;
            }
          }
        }

        // 6. Contentment mood level increase by 1 if the plant has been Sunlight 2 times in 60 hour
        const actionSunlight = mastAction.find((a) => a.actionName === 'Sunlight');
        const moodContentment = mastMood.find((m) => m.mood === "Contentment");
        const sunlight = eventLog.filter((e) => e.actionId === actionSunlight.id && e.actionAt > sixtyHourAgo);
        if (sunlight.length >= 2) {
          const targetMood = plantMood.find((m) => m.moodId === moodContentment.id);
          const moodLevelStage = targetMood.moodLevelStage[0];
          if (moodLevelStage.modifiedDate > twelveHourAgo) {
            if (moodLevelStage.stage < moodLevelStage.maxStage) {
              moodLevelStage.stage += 1;
            } else {
              targetMood.moodLevel += 1;
              moodLevelStage.stage = 1;
            }
          }
        }

        // 7. Gratitude mood level increase by 1 if the plant has been Watered 3 times and Sunlight 2 in 60 hour
        const moodGratitude = mastMood.find((m) => m.mood === "Gratitude");
        if (watered.length >= 3 && sunlight.length >= 2) {
          const targetMood = plantMood.find((m) => m.moodId === moodGratitude.id);
          const moodLevelStage = targetMood.moodLevelStage[0];
          if (moodLevelStage.modifiedDate > twelveHourAgo) {
            if (moodLevelStage.stage < moodLevelStage.maxStage) {
              moodLevelStage.stage += 1;
            } else {
              targetMood.moodLevel += 1;
              moodLevelStage.stage = 1;
            }
          }
        }

        // 8. Resilience mood will in other negative mood level decrease by 1 in 24 hour
        const moodResilience = mastMood.find((m) => m.mood === "Resilience");
        const targetMood = plantMood.find((m) => m.moodId === moodResilience.id);
        const isResilienceUpdatedIn24HourAgo = targetMood.moodLevelStage.find((m) => m.modifiedDate > twentyFourHourAgo) ? true : false;
        const isResilienceAbleToIncrease = !isResilienceUpdatedIn24HourAgo; // This variable to use when negative mood reduce. If the negative mood reduce, this variable will be true and resilience mood will increase by 1

        // 9. Abundance mood level increase by 1 if the plant level is more than 2 and mood update in 24 hour
        const moodAbundance = mastMood.find((m) => m.mood === "Abundance");
        if (p.growsLevel >= 3) {
          const targetMood = plantMood.find((m) => m.moodId === moodAbundance.id);
          const moodLevelStage = targetMood.moodLevelStage[0];
          if (moodLevelStage.modifiedDate > twentyFourHourAgo) {
            if (moodLevelStage.stage < moodLevelStage.maxStage) {
              moodLevelStage.stage += 1;
            } else {
              targetMood.moodLevel += 1;
              moodLevelStage.stage = 1;
            }
          }
        }

        // 10. Withering mood level increase by 1 if the plant has not been Watered or Sunlight in 60 hour
        const moodWithering = mastMood.find((m) => m.mood === "Withering");
        if (watered.length === 0 || sunlight.length === 0) {
          const targetMood = plantMood.find((m) => m.moodId === moodWithering.id);
          const moodLevelStage = targetMood.moodLevelStage[0];
          if (moodLevelStage.modifiedDate > twelveHourAgo) {
            if (moodLevelStage.stage < moodLevelStage.maxStage) {
              moodLevelStage.stage += 1;
            } else {
              targetMood.moodLevel += 1;
              moodLevelStage.stage = 1;
            }
          }
        }

        // 11. Sadness mood level increase by 1 if the plant has not been Interactions in 60 hour
        const actionInteractions = mastAction.find((a) => a.actionName === 'Interactions');
        const moodSadness = mastMood.find((m) => m.mood === "Sadness");
        const interactions = eventLog.filter((e) => e.actionId === actionInteractions.id && e.actionAt > sixtyHourAgo);
        if (interactions.length === 0) {
          const targetMood = plantMood.find((m) => m.moodId === moodSadness.id);
          const moodLevelStage = targetMood.moodLevelStage[0];
          if (moodLevelStage.modifiedDate > twelveHourAgo) {
            if (moodLevelStage.stage < moodLevelStage.maxStage) {
              moodLevelStage.stage += 1;
            } else {
              targetMood.moodLevel += 1;
              moodLevelStage.stage = 1;
            }
          }
        }

        // 12. Vulnerability mood level increase by 1 if the plant has not been Sunlight in 60 hour
        const moodVulnerability = mastMood.find((m) => m.mood === "Vulnerability");
        if (sunlight.length === 0) {
          const targetMood = plantMood.find((m) => m.moodId === moodVulnerability.id);
          const moodLevelStage = targetMood.moodLevelStage[0];
          if (moodLevelStage.modifiedDate > twelveHourAgo) {
            if (moodLevelStage.stage < moodLevelStage.maxStage) {
              moodLevelStage.stage += 1;
            } else {
              targetMood.moodLevel += 1;
              moodLevelStage.stage = 1;
            }
          }
        }

        // 13. Dormancy mood level increase by 1 if other all negative mood level is more than 3
        const moodDormancy = mastMood.find((m) => m.mood === "Dormancy");
        const negativeMood = plantMood.filter((m) => m.isPositive === 0);
        const negativeMoodLevel = negativeMood.reduce((acc, cur) => acc + cur.moodLevel, 0);
        if (negativeMoodLevel > 3) {
          const targetMood = plantMood.find((m) => m.moodId === moodDormancy.id);
          const moodLevelStage = targetMood.moodLevelStage[0];
          if (moodLevelStage.modifiedDate > twelveHourAgo) {
            if (moodLevelStage.stage < moodLevelStage.maxStage) {
              moodLevelStage.stage += 1;
            } else {
              targetMood.moodLevel += 1;
              moodLevelStage.stage = 1;
            }
          }
        }

        // 14. Update the mood level ( already done in the above code )

        
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
