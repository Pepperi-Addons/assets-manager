import { validate } from 'jsonschema';

const THUMBNAIL_ENUM = ['200x200', '400x400'];

const SYNC_ENUM = ['None', 'Device', 'DeviceThumbnail', 'Always'];

const AssetObjectScheme = 
{
    "type": "object",
    "properties": {
        "Name": {
            "type": "string"
        },
        "Mime": {
            "type": "string"
        },
        "Thumbnails": {
            "type": "array",
            "items": {
                "type": "string",
                "enum": THUMBNAIL_ENUM
            }
        },
        "AddonUUID": {
            "type": "string"
        },
        "Sync": {
            "type": "string",
            "enum": SYNC_ENUM
        },
        "URLPersistent": {
            "type": "boolean"
        },
        "URL": {
            "type": "string"
        },
        "URI": {
            "type": "string"
        }
    },
    "required": [
        "Name",
        "URI"
    ],
    "additionalProperties": false
}

export class Validator {
    static validate(obj: any): boolean {
        const validation = validate(obj, AssetObjectScheme, {allowUnknownAttributes:false});
        return validation.valid;
    }
}