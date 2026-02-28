import { Controller, Get } from '@nestjs/common';
import { TreatmentService } from './treatment.service';

@Controller('treatments')
export class TreatmentGlobalController {
    constructor(private readonly treatmentService: TreatmentService) { }

    @Get('categories')
    findDistinctCategories() {
        return this.treatmentService.findDistinctCategories();
    }
}
