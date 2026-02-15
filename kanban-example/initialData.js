export const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Design UI' },
    'task-2': { id: 'task-2', content: 'Fix bugs' },
  },
  columns: {
    'column-1': { id: 'column-1', title: 'To Do', taskIds: ['task-1'] },
    'column-2': { id: 'column-2', title: 'Done', taskIds: ['task-2'] },
  },
  columnOrder: ['column-1', 'column-2'],
};
