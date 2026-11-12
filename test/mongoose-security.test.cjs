const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const mongoose = require('mongoose');

// Exercise the real model without connecting to or changing any database.
const source = fs.readFileSync(require.resolve('../server/db/models/note.js'), 'utf8')
  .replace('export default ', 'module.exports = ');
const sandbox = { require, module: { exports: {} } };
vm.runInNewContext(source, sandbox, { filename: 'note.js' });
const Note = sandbox.module.exports;

test('note model still casts, validates, and supplies date defaults', () => {
  const note = new Note({ title: 'Test', content: 'Body' });
  assert.equal(note.validateSync(), undefined);
  assert.equal(note.title, 'Test');
  assert.equal(note.content, 'Body');
  assert.ok(note.date instanceof Date);
  const invalid = new Note({});
  assert.ok(invalid.validateSync().errors.title);
  assert.ok(invalid.validateSync().errors.content);
});

test('document updates do not traverse inherited properties', () => {
  for (const path of ['__proto__.securityProbe', 'constructor.prototype.securityProbe', 'toString.securityProbe']) {
    const note = new Note({ title: 'Test', content: 'Body' });
    note.set(path, true);
    assert.equal(Object.prototype.securityProbe, undefined);
    assert.equal(Object.prototype.toString.securityProbe, undefined);
    assert.equal(note.toObject().securityProbe, undefined);
    assert.equal(note.validateSync(), undefined);
  }
});

test('schema virtuals reject prototype-mutating paths', () => {
  const schema = new mongoose.Schema({ title: String });
  assert.throws(() => schema.virtual('__proto__.securityProbe'), /special property/);
  assert.throws(() => schema.virtual('constructor.prototype.securityProbe'), /special property/);
  assert.equal(Object.prototype.securityProbe, undefined);
});
