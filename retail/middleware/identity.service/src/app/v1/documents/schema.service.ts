import { Injectable, Logger } from '@nestjs/common';
import { Validator } from 'jsonschema';

import { CUSTOM_ERROR } from './document.model';
import { SCHEMA } from '@volumes/validators/schema.validator';
import { mapper } from '@volumes/mappers/customer.mapper'

export interface ISCHEMA_ERROR {
    message: string,
    field?: string,
    stack: string
    value?: string | number | boolean
}

@Injectable()
export class SchemaService {
    private readonly logger: Logger = new Logger(SchemaService.name);
    // private schemas: Record<string, any>;
    private readonly __validator: Validator = new Validator();
    constructor() {
        // this.schemas = this.makeSchemas(SCHEMA);
        // this.logger.log(this.schemas)
    }

    private makeSchemas(properties: Record<string, any>): Record<string, any> {
        let schemas = {};
        properties.forEach((property) => {
            if (property.groups && property.groups.length > 0) {
                property.groups.forEach((group) => {
                    if (!schemas[group]) {
                        schemas[group] = { properties: {}, required: [] };
                    }
                    schemas[group]["properties"][property.name] = property;
                    if (property.required) {
                        schemas[group]["required"].push(property.name);
                    }
                });
            }
        });
        return schemas;
    }

    sanitize(key: string, properties: Record<string, any>) {
        const schemas = this.makeSchemas(properties);
        const schema = schemas[key] || {};
        return {
            type: "object",
            properties: schema?.properties || {},
            required: schema?.required || [],
        };
    }
    // getSchema(key: string): Record<string, any> {
    //     const schema = this.schemas[key] || {};
    //     return {
    //         type: "object",
    //         properties: schema?.properties || {},
    //         required: schema?.required || [],
    //     };
    // }
    // validate(group: string, data: Record<string, any>): CUSTOM_ERROR {
    //     this.logger.log(data);
    //     const schema: Record<string, any> = this.getSchema(group);
    //     const result = this.__validator.validate(data, schema);
    //     let response: CUSTOM_ERROR = { valid: true, errors: null };
    //     if (result.errors.length > 0) {
    //         response = {
    //             valid: false,
    //             errors: this.formatErrors(group, schema, result.errors),
    //         }
    //     }
    //     this.logger.log(`Schema Validation Response: ${JSON.stringify(response, null, 2)}`);
    //     return response;
    // }

    validate(group: string, data: Record<string, any>): CUSTOM_ERROR {
        let response: CUSTOM_ERROR = { valid: true, errors: null };
        const schemas = SCHEMA(group, data);
        const sanitizeSchema = this.sanitize(group, schemas);
        const result = this.__validator.validate(data, sanitizeSchema);
        if (result.errors.length > 0) {
            response = {
                valid: false,
                errors: this.formatErrors(group, sanitizeSchema, result.errors),
            }
        }
        return response;
    }
    private formatErrors(group: string, schema: Record<string, any>, errors: Record<string, any>): any {
        const _errors = [];
        const errorCodes: string[] = [];
        this.logger.log(`Schema Errors: ${JSON.stringify(errors, null, 2)}`);
        errors.forEach((err) => {
            if (
                err?.schema?.["context"]?.[err.name]
            ) {
                const _err = err.schema["context"][err.name];
                if (!errorCodes.includes(_err.errorCode)) {
                    errorCodes.push(_err.errorCode as string);
                    _errors.push({
                        // group,
                        message: _err.message,
                        name: `${err.schema.name}_${err.name}`.toUpperCase().replace(/\s/g, '_'),
                        field: err.schema.name,
                        stack: err.stack,
                        value: err.instance,
                    });
                }

            } else if (typeof err.argument == 'string' && schema.properties[err.argument]["context"][err.name]) {
                const _err = schema.properties[err.argument]["context"][err.name];
                if (!errorCodes.includes(_err.errorCode)) {
                    errorCodes.push(_err.errorCode as string);
                    _errors.push({
                        // group,
                        message: _err.message,
                        name: `${err.argument}_${err.name}`.toUpperCase().replace(/\s/g, '_'),
                        field: err.argument,
                        stack: err.stack,
                        value:
                            err.name === "required" ? err.instance[err.argument] : err.instance,
                    });
                }
            } else {
                _errors.push({
                    // group,
                    stack: err.stack,
                    message: err.message,
                    field: err?.schema?.name,
                    value: err.instance?.[err?.schema?.name] || err?.instance
                });
            }
        });
        console.log(JSON.stringify(_errors, null, 2))
        return _errors;
    }

    mapAttributes(documents: any): Record<string, any> {
        return mapper(documents);
    }

}