import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInterviewDto } from './dtos/create-interview.dto';
import { UpdateInterviewDto } from './dtos/update-interview.dto';
import { Interview } from './entities/interview.entity';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectModel(Interview.name)
    private readonly interviewModel: Model<Interview>
  ) {}

  async findById(id: string) {
    const interview = await this.interviewModel.findById(id).exec();
    if (!interview) {
      throw new NotFoundException(`Interview #${id} not found`);
    }
    return interview;
  }

  create(interviewDto: CreateInterviewDto) {
    const interview = new this.interviewModel(interviewDto);
    return interview.save();
  }

  async update(id: string, interviewDto: UpdateInterviewDto) {
    const updatedInterview = await this.interviewModel
      .findByIdAndUpdate(id, interviewDto, { new: true })
      .exec();
    if (!updatedInterview) {
      throw new NotFoundException(`Interview #${id} not found`);
    }
    return updatedInterview;
  }

  async delete(id: string) {
    const result = this.interviewModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Interview #${id} not found`);
    }
  }
}
