import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateInterviewDto } from './dtos/create-interview.dto';
import { UpdateInterviewDto } from './dtos/update-interview.dto';
import { InterviewsService } from './interviews.service';

@UseGuards(JwtAuthGuard)
@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.interviewsService.findById(id);
  }

  @Post()
  create(@Body() interviewDto: CreateInterviewDto) {
    return this.interviewsService.create(interviewDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() interviewDto: UpdateInterviewDto) {
    return this.interviewsService.update(id, interviewDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: string) {
    this.interviewsService.delete(id);
  }
}
