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

  async findAll(skip = 0, limit = 10, filter = {}, sort = {}) {
    const resultArr = await this.applicationModel
      .aggregate([
        { $match: { ...filter } },
        { $sort: { ...sort, createdAt: -1 } },
        { $facet: { data: [], total: [{ $count: 'createdAt' }] } },
        { $unwind: '$total' },
        {
          $project: {
            data: { $slice: ['$data', skip, limit] },
            meta: {
              totalDocuments: '$total.createdAt',
              currentPage: { $literal: skip / limit + 1 },
              totalPages: { $ceil: { $divide: ['$total.createdAt', limit] } },
              pageSize: { $literal: limit },
            },
          },
        },
      ])
      .exec();
    return resultArr.at(0);
  }

  async findById(id: string) {
    const application = await this.applicationModel.findById(id).exec();
    if (!application) {
      throw new NotFoundException(`Application #${id} not found`);
    }
    return application;
  }

  create(createApplicationDto: CreateApplicationDto) {
    const application = new this.applicationModel(createApplicationDto);
    return application.save();
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const existingApplication = await this.applicationModel
      .findByIdAndUpdate(id, updateApplicationDto, { new: true })
      .exec();

    if (!existingApplication) {
      throw new NotFoundException(`Application #${id} not found`);
    }

    return existingApplication;
  }

  async remove(id: string) {
    const application = await this.findById(id);
    return application.deleteOne();
  }
}
