import {Injectable, HttpException, HttpStatus, Inject, BadRequestException} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { MongoGridFS } from 'mongo-gridfs';
import * as Busboy  from "busboy";
import { GridFSBucketReadStream } from 'mongodb';
import { Connection, Model, mongo } from 'mongoose';
import * as mongoose from "mongoose";
import * as streamBuffers from "stream-buffers";



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
   // return this.filesDbModel.create(file);
    const body = file;
    const type = file.mimetype;

    const extension = type.replace("image/", ".");
    const gfs = new mongo.GridFSBucket(this.fileModel.connection, { bucketName: "fs" });

    return new Promise((resolve, reject) => {
      if (type === "image/png" || type === "image/jpg" || type === "image/jpeg" || type === "image/pjpeg") {
        const bufer = new Buffer(body.buffer, "binary");
        if (!Object.keys(bufer).length) {
          reject(new BadRequestException("empty data"));
        }
        const writeStream = gfs.openUploadStream('gevorg', { contentType: type });
        const writestreamId = writeStream.id;

        const readStream = new streamBuffers.ReadableStreamBuffer({
          chunkSize: bufer.length
        });

        readStream.push(bufer);
        readStream.push(null); // Push null to end readStream
        readStream.pipe(writeStream);

        writeStream.on("error", (err) => {
          reject(new BadRequestException(err));
        });
        writeStream.on("finish", () => {
          resolve(writestreamId);
        });
      } else {
        reject(new BadRequestException("wrong format"));
      }
    });

  }

  async readStream(id: string, res: any): Promise<GridFSBucketReadStream> {
    let gfs = new mongo.GridFSBucket(this.fileModel.connection, { bucketName: "fs" });
    let data = null;
    try {
      data = await gfs.find({ _id: mongoose.Types.ObjectId(id) });
    } catch (e) {
     // return next(new BadRequestException("invalid profile image id"));
    }

    if (!data) {
      return res.send({status:"ok"});
     // return getDefaultImage(gfs, res, next);
    }

    /*  if (err || isEmptyArray(docs)) {
       // return getDefaultImage(gfs, res, next);
      }*/
//      res.header("Content-Type", data && data[0] && data[0].contentType ? data[0].contentType : process.env.PROFILE_IMAGE_DEFAULT_TYPE);

      let downloadStream = gfs.openDownloadStream(mongoose.Types.ObjectId(id));
      downloadStream.on("error", () => {
       // getDefaultImage(gfs, res);
      });
      downloadStream.on("data", (chunk) => {
        // On Stream
        // console.log( chunk.length )
        console.log('ok');
        console.log(chunk);
      }).pipe(res);
      downloadStream.on("end", function () {
        data = null;
        gfs = null;
        downloadStream = null;
        res.send();
      });


   // return await this.fileModel.readFileStream(id);
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
