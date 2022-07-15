import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('applications')
export class ApplicationsController {
  @Get()
  findAll() {
    return 'All applications';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'Application ID = ' + id;
  }

  @Post()
  create(@Body() createApplicationDto) {
    return 'Application Created! ' + createApplicationDto;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationDto) {
    return `Application with ID ${id} updated! ` + updateApplicationDto;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `Application ${id} deleted!`;
  }
}
