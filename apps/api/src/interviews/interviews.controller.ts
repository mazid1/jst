import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UpdateInterviewDto } from './dtos/update-interview.dto';
import { InterviewsService } from './interviews.service';

@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.interviewsService.findById(id);
  }

  // @Post()
  // create(@Body() interviewDto: CreateInterviewDto) {
  //   return this.interviewsService.create(interviewDto);
  // }

  @Patch(':id')
  update(@Param('id') id: string, interviewDto: UpdateInterviewDto) {
    return this.interviewsService.update(id, interviewDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.interviewsService.delete(id);
  }
}
