import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { UpdateApplicationDto } from './dtos/update-application.dto';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>
  ) {}

  findAll() {
    return this.applicationModel
      .find()
      .populate(['organization', 'interviews'])
      .exec();
  }

  async findById(id: string) {
    const application = await this.applicationModel
      .findById(id)
      .populate(['organization', 'interviews'])
      .exec();
    if (!application) {
      throw new NotFoundException(`Application #${id} not found`);
    }
    return application;
  }

  create(createApplicationDto: CreateApplicationDto) {
    const application = new this.applicationModel(createApplicationDto);
    application.populate(['organization', 'interviews']);
    return application.save();
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const existingApplication = await this.applicationModel
      .findByIdAndUpdate(id, updateApplicationDto, { new: true })
      .populate(['organization', 'interviews'])
      .exec();

    if (!existingApplication) {
      throw new NotFoundException(`Application #${id} not found`);
    }

    return existingApplication;
  }

  async remove(id: string) {
    const application = await this.findById(id);
    return application.remove();
  }
}
