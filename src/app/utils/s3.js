import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: process.env.AWS_DEFAULT_REGION });

const s3 = {
  uploadFile: async (key, body, contentType) => {
    const fileCreationCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: contentType,
      ContentDisposition: "attachment"
    });

    return s3Client.send(fileCreationCommand);
  }
}

export default s3;