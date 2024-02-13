import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PlantService } from './plant.service';

@Controller()
export class PlantController {
  constructor(
    private readonly plantService: PlantService,
  ) {}

  @GrpcMethod('PlantController', 'GetPlantOne')
  findOne(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    const results = this.plantService.findOne(data.id);
    return results;
  }

  @GrpcMethod('PlantController', 'PlantATree')
  plantATree(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    const { userid } = call.request.headers;
    const results = this.plantService.plantATree(userid, data);
    return results;
  }
}
