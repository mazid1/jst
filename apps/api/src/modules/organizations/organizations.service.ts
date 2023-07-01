import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResponse } from '../../common/PaginaedResponse';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { FilterOrganization } from './types/filter-organization';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>
  ) {}

  async findAll(
    skip = 0,
    limit = 10,
    filter = {},
    sort = {}
  ): Promise<PaginatedResponse<Organization>> {
    const resultArr = await this.organizationModel
      .aggregate([
        { $match: { ...filter, isDeleted: false } },
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

  filterBy({ name }: FilterOrganization) {
    return this.organizationModel.find(
      { isDeleted: false, name: new RegExp(name, 'i') },
      'name'
    );
  }

  async findById(id: string) {
    const organization = await this.organizationModel.findById(id).exec();
    if (!organization || organization.isDeleted) {
      throw new NotFoundException(`Organization #${id} not found`);
    }
    return organization;
  }

  create(createOrganizationDto: CreateOrganizationDto) {
    const organization = new this.organizationModel(createOrganizationDto);
    return organization.save();
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    const updatedOrganization = await this.organizationModel
      .findByIdAndUpdate(id, updateOrganizationDto, { new: true })
      .exec();
    if (!updatedOrganization) {
      throw new NotFoundException(`Organization #${id} not found`);
    }
    return updatedOrganization;
  }

  async deleteSoftly(id: string) {
    const deletedOrganization = await this.organizationModel
      .findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .exec();
    if (!deletedOrganization) {
      throw new NotFoundException(`Organization #${id} not found`);
    }
    return deletedOrganization;
  }
}
