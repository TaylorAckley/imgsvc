# ImgSvc

Send your image to a Lambda function to have it resized.  Uses Sharp Image Processor

### Features

- Accepts either a buffer or s3 object (bucket, key)
- Will deliver either a buffer of the resized image, or will write the file to s3.

## Request Body

Takes a JSON payload via restful endpoint to resize image to specified h/w.

Example

```
{
    s3: {
    bucket: 'my-bucket',
    key: 'path/to/img.png'
    },
    buf: <file buffer>,
    params: {
    h: 100 // in pixels.  leave null to resize proportionally
    w: 100   // in pixels.  leave null to resize proportionally
    },
    delivery: {
    s3: {
    bucket: 'my-resize-bucket',
    key: 'path/to/resized-img.png  //leave blank to deliver to overwrite-orig file.
    }
    
    }
}