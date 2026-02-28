import { Module } from '@nestjs/common';
import { TreatmentController } from './treatment.controller';
import { TreatmentGlobalController } from './treatment-global.controller';
import { TreatmentService } from './treatment.service';

@Module({
  controllers: [TreatmentController, TreatmentGlobalController],
  providers: [TreatmentService],
  exports: [TreatmentService],
})
export class TreatmentModule { }
