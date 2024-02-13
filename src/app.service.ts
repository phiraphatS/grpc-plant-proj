import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PlantController } from './module/plant/plant.controller';
import { ClientGrpc } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Injectable()
export class AppService implements OnModuleInit {
  private plantController: PlantController;
  constructor(
    @Inject('PLANT_PACKAGE') 
    private client: ClientGrpc
  ) {}

  onModuleInit() {
    this.plantController = this.client.getService<PlantController>('PlantController');
  }

  // getCactus() {
  //   const metadata = new Metadata();
  //   return this.plantService.findOne({ id: 1 }, metadata, null);
  // }
}
