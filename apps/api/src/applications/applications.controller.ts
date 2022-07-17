import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dtos/create-application.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationService: ApplicationsService) {}

  @Get()
  findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(id);
  }

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationDto) {
    return this.applicationService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(id);
  }
}
