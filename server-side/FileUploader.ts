let AWS = require('aws-sdk');

export class FileUploader {
    async uploadToAWS(filename: string, filebody: string, contentType: string): Promise<boolean> {
        try {
            //let s3 = new AWS.S3();

            

            const bucket = 'pepperi-storage-staging';
            const entryname = '1110703/Assets/' + filename;

            let buf = Buffer.from(filebody.split(/base64,/)[1], 'base64');
            let params = {
                Bucket: bucket, 
                Key: entryname, 
                Body: buf, 
                ACL: "public-read",
                ContentType: contentType,
                ContentEncoding: 'base64'
            };

            // Uploading files to the bucket (async)
            // s3.upload(params, function(err, data) {
            //     if (err) {
            //         console.error(err.message);
            //     }
            //     console.log(`File uploaded successfully. ${data.Location}`);
            // });

            // Uploading files to the bucket (sync)
            const uploaded = await s3.upload(params).promise();

            console.log(`File uploaded successfully to ${uploaded.Location}`);
        }
        catch (err)
        {
            if (err instanceof Error)
                console.error(`Could not upload file ${filename} to S3. ${err.message}`);
        }
        return false;
    }
}