import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv({ allErrors: true });

type MyData = { page: string };

ajv.addKeyword({
  keyword: 'page',
  validate: (schema: number, data: MyData) =>
    Object.keys(data)[0] === 'page' ? !isNaN(+data.page) : false,
});

const schema: JSONSchemaType<MyData> = {
  type: 'object',
  properties: {
    page: { type: 'string' },
  },
  required: ['page'],
  additionalProperties: false,
  page: 0,
};

const validate = ajv.compile(schema);

export { ajv, validate };
