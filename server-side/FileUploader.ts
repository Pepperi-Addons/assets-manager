export class FileUploader {
    async uploadToAWS(filename: string, filebody: string): Promise<boolean> {
        let AWS = require('aws-sdk');
        const region = "us-west-2";
        AWS.config.update(
            {
                //accessKeyId,
                //secretAccessKey,
				//sessionToken,
                region
            }
        );
        let S3 = new AWS.S3();
        let upload = new S3.ManagedUpload({
            params: {
                Bucket: 'pepperi-storage-staging',
                Key: filename,
                Body: filebody
            }
        });

        let promise = upload.promise();

        promise.then(
            function(data) {
              console.log("Successfully uploaded file " + filename + '. Data: ' + data);
              return true;
            },
            function(err) {
              console.error("Error uploading file: ", err.message);
              return false;
            }
        );

        return false;
    }
}