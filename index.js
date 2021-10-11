const {
  quicktype,
  InputData,
  JSONSchemaInput,
  JSONSchemaStore,
} = require('quicktype-core');
const path = require('path');
const fs = require('fs');

async function quicktypeJSONSchema(targetLanguage, typeName, jsonSchemaString) {
  const schemaInput = new JSONSchemaInput(new JSONSchemaStore());

  // We could add multiple schemas for multiple types,
  // but here we're just making one type from JSON schema.
  await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

  const inputData = new InputData();
  inputData.addInput(schemaInput);

  return await quicktype({
    inputData,
    lang: targetLanguage,
  });
}

async function main() {
  // read the schema details
  const schemaFilepath = path.join(__dirname, 'book.json');
  const bookSchema = fs.readFileSync(schemaFilepath, 'utf-8');

  const { lines: tsPerson } = await quicktypeJSONSchema(
    'typescript',
    'Book',
    bookSchema
  );
  console.log(tsPerson.join("\n"));
  //1.创建文件夹
  fs.mkdirSync('./test');
  //2.创建文件
  //3.写文件内容
  fs.writeFileSync('./test/test.ts', tsPerson.join("\n"));
}

main();
