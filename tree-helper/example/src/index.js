import { list } from './data';
import { toTree, cascade } from '../../index';

const root = toTree(list, ({ id }) => id, ({ parentId }) => parentId);
console.log(root);

const data = [];
cascade(root, ({ link }) => {
  data.push(link);
});

console.log(data);
