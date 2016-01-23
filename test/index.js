import {enter, exit, boink} from '../boink';
import Type from '../type';
import tape from 'tape';

tape('Basic exit', t => {
  const a = exit(Type.number)(n => n * 2);
  t.doesNotThrow(() => a(3), null, 'Does not throw when used correctly');

  const b = exit(Type.string)(n => n * 2);
  t.throws(() => b(3), null, 'Does throw when exit value is incorrect');

  t.end();
});

tape('Basic enter', t => {
  const fn = (str, n) => str.length === n;
  const a = enter(Type.string, Type.number)(fn);
  t.doesNotThrow(() => a('foo', 42), null,
                 'Doesn\'t throw when given correct parameters');

  const b = enter(Type.object, Type.number)(fn);
  t.throws(() => b('foo', 42), null,
           'Does throw when parameters does not fit the type signatrue');

  t.end();
});

tape('Basic boink', t => {
  const fn = (str, n) => str.length === n;
  const a = boink(Type.string, Type.number)(Type.bool)(fn);
  t.doesNotThrow(() => a('foo', 42), null,
                 'Boink doesn\'t throw when given correct parameters');

  t.throws(() => a('foo', 'bar'), null,
           'Boink does throw when parameters does not fit the type signatrue');

  t.end();
});

tape('All basic types', t => {
  const testBool = enter(Type.bool)(n => n);
  t.doesNotThrow(() => testBool(true), null, 'Does not throw: Bool');
  t.throws(() => testBool(42), null, 'Does throw: Bool');

  const testString = enter(Type.string)(n => n);
  t.doesNotThrow(() => testString('foo'), null, 'Does not throw: String');
  t.throws(() => testString(42), null, 'Does throw: String');

  const testNumber = enter(Type.number)(n => n);
  t.doesNotThrow(() => testNumber(42), null, 'Does not throw: Number');
  t.throws(() => testNumber([]), null, 'Does throw: Number');

  const testArray = enter(Type.array)(n => n);
  t.doesNotThrow(() => testArray([]), null, 'Does not throw: Array');
  t.throws(() => testArray(42), null, 'Does throw: Array');

  const testObject = enter(Type.object)(n => n);
  t.doesNotThrow(() => testObject({}), null, 'Does not throw: Object');
  t.throws(() => testObject([]), null, 'Does throw: Object');

  const testInt = enter(Type.int)(n => n);
  t.doesNotThrow(() => testInt(42), null, 'Does not throw: Number');
  t.throws(() => testInt(4.2), null, 'Does throw: Number');

  const testArrayOf = enter(Type.arrayOf(Type.int))(n => n);
  t.doesNotThrow(() => testArray([1, 2, 3]), null, 'Does not throw: ArrayOf');
  t.throws(() => testArray(1, 2, 2.9), null, 'Does throw: ArrayOf');

  t.end();
});

tape('Custom types', t => {
  const TypePerson = x => {
    if (typeof x !== 'object'
      || typeof x.name !== 'string'
      || typeof x.age !== 'number')
      return new Error(x + ' is not a person! A person has a name and an age.')
  };

  const fn = enter(TypePerson)(person => person.age);

  t.doesNotThrow(() => fn({name: 'foo', age: 1}), null,
                 'No problem is we pass in a person');

  t.throws(() => fn({age: 5}), null,
           'Problem is person is not a person (no name!)');

  t.end();
});

tape('Mix', t => {
  repeat = enter(Type.int, Type.string)(repeat);
  repeat = exit(Type.string)(repeat);
  function repeat (n, str) {
    if (n === 42) return n;  // odd case, just to force an error being throw
    return (new Array(n)).fill(str).join('')
  }

  t.doesNotThrow(() => repeat(4, 'hello'), null,
                 'Basic both enter and exit test');

  t.throws(() => repeat(4), null, 'Too few arguments');

  t.throws(() => repeat(42, 'foo'), null,
    'Throws because 42 is the magic number that changes the type of the exit');

  t.end();
});
