import { Injectable, HttpException, HttpStatus, Inject, BadRequestException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import * as Busboy from 'busboy';
import { GridFSBucketReadStream } from 'mongodb';
import { Connection, Model, mongo } from 'mongoose';
import * as mongoose from 'mongoose';
import * as streamBuffers from 'stream-buffers';


@Injectable()
export class FilesService {
  private readonly fileModel: MongoGridFS;

  @Inject('FILES_MODEL')
  private readonly filesDbModel: Model<any>;

  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }

  async uploadFile(file) {
    const {
      buffer: body,
      mimetype: type,
      originalname,
    } = file;

    const gfs = new mongo.GridFSBucket(this.fileModel.connection, { bucketName: 'fs' });

    return new Promise((resolve, reject) => {
      if (/.(png|jpg|jpeg|pjpeg|pdf)$/.test(type)) {
        const buffer = new Buffer(body, 'binary');
        if (!Object.keys(buffer).length) {
          reject(new BadRequestException('EMPTY_DATA'));
        }
        const writeStream = gfs.openUploadStream(originalname, { contentType: type });
        const writeStreamId = writeStream.id;

        const readStream = new streamBuffers.ReadableStreamBuffer({
          chunkSize: buffer.length,
        });

        readStream.push(buffer);
        readStream.push(null);
        readStream.pipe(writeStream);

        writeStream.on('error', (err) => {
          reject(new BadRequestException(err));
        });
        writeStream.on('finish', () => {
          resolve(writeStreamId);
        });
      } else {
        reject(new BadRequestException('WRONG_FORMAT'));
      }
    });

  }

  async readStream(id: string, res: any): Promise<GridFSBucketReadStream> {
    let gfs = new mongo.GridFSBucket(this.fileModel.connection, { bucketName: 'fs' });
    let data = null;
    try {
      data = await gfs.find({ _id: mongoose.Types.ObjectId(id) });
    } catch (e) {
      throw new BadRequestException('INVALID_PROFILE_IMAGE_ID');
    }

    if (!data) {
      return res.send({ status: 'ok' });
    }
    let downloadStream = gfs.openDownloadStream(mongoose.Types.ObjectId(id));

    downloadStream.on('data', (chunk) => {
      console.log(chunk);
    }).pipe(res);

    downloadStream.on('end', () => {
      data = null;
      gfs = null;
      downloadStream = null;
      res.send();
    });
  }

  async findInfo(id: string): Promise<any> {
    const result = await this.fileModel
      .findOne({ _id: id }).catch(err => {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      })
      .then(result => result);
    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType,
    };
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.fileModel.delete(id);
  }
}
