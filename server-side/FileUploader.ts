let AWS = require('aws-sdk');

export class FileUploader {
    async uploadToAWS(filename: string, filebody: string, contentType: string): Promise<boolean> {
        try {
            //let s3 = new AWS.S3();

            // DO NOT COMMIT NOR PUBLISH
            const accessKeyId = 'ASIA3SWCYKQB66TSNB2D';
            const secretAccessKey = 'WUlZ095T7c8tFqjeiAvQCk5hdWVYt1JfPCstRyoi';
            const sessionToken = "IQoJb3JpZ2luX2VjEFQaDGV1LWNlbnRyYWwtMSJGMEQCIA1AuaxC0+4O3y/OpWA8ezVELPiSzPsOh5NoeTLP8PcUAiAxW5zS0fd4XhGw3cu2h2g65K5muabUjSyCpiQk3niYOSqXAwjt//////////8BEAEaDDc5NjA1MTEzMzQ0MyIMHDNu1jw3WEMiKdHkKusCp4WRlrdjW9qgL6TXP9jem5AtxJTE0O14hj+8puI75bArSKMMQQTB6DsbVKDN8T7OYK7PM3zDYl1rMmDHe0kIfzOQfmysDuo6NRo2aVotCnmGKbk4RJd8jFn9Ot0Zd/V+0PbCYb+U7g9h5wZqfgbwq6pGr0I8QEyc3QHFm+NDUGNJzZRC1InIALQpWFEaQhW4vGCkJIlnl8xMpnK4ax4UVSkBaXUGeQo3y09vOJPSOkWmWL+LKjSZ8gKzQp8cZ8wOMLwQdTvmkEzTvKlBK0A7O9Amy2U1s2g3izFiHxnM5WNV779ShPpYd7lgV9wQC9yUukrbgsBbNOtviuA7vscznBKCxxDRCNZ+WPuilQoJ/OOpMWJnlvcoH4UNn/9jhahmwxkuoRWxe2Y91QY7rqoKLDippZtdz9KwG4st0juB9GKqCpn/kC4BRqRHW7sUouBqHHNPcDdkPU8NFCa2vK0zXqW8WdddLXQ5P/I5MIX/+YsGOqcB8RER8ThzIc7fD5TARdM7bjqbRY4LMVEVHbSRGFQzgkkXsp2r+3Jq+OlXRijXEmB4h89KJzH+avRI07RedD2aDQ8qjyEKKnA0D7gjZB8OUzqGwkPY8OzTwpCWGEK91XTvpK07NHo8nacu7H6FJAIHHUNe43OZm9uUHcZ3BG5Z7odbWH9734oC62h4xG1uctmt4WmZRBZANKpJ7PXEviBadV6b0aRIB50=";

            let s3 = new AWS.S3({
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
                sessionToken: sessionToken
            });
            // END OF DO NOT COMMIT

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