import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MongoGridFS } from 'mongo-gridfs';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GridFSBucketReadStream } from 'mongodb';
import { FileInfoVm } from '../../../schemas/FileInfoVm';

@Injectable()
export class FileService {
  private readonly fileModel: MongoGridFS;

  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    const result = await this.fileModel
      .findById(id).catch(err => {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      });
    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType
    };
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.fileModel.delete(id);
  }
}
