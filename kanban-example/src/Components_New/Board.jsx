
import { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import List from './List';

const Board = () => {
  const [lists, setLists] = useState([
    {
      id: 'list-1',
      title: 'To Do',
      tasks: [
        { id: 'task-1', content: 'Task 1' },
        { id: 'task-2', content: 'Task 2' }
      ]
    },
    {
      id: 'list-2',
      title: 'In Progress',
      tasks: [
        { id: 'task-3', content: 'Task 3' }
      ]
    },
    {
      id: 'list-3',
      title: 'Done',
      tasks: []
    },
    {
      id: 'list-4',
      title: 'L 4',
      tasks: []
    },
    {
      id: 'List-5',
      title: 'L 5',
      tasks: []
    },
    {
      id: 'List-6',
      title: 'L 6',
      tasks: []
    },
    {
      id: 'List-7',
      title: 'L 7',
      tasks: []
    },
    {
      id: 'Lst 8',
      title: 'L 8',
      tasks: []
    },
  ]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    // If dropped outside any droppable area
    if (!destination) return;

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    // console.log("type = ", type)
    // Handle list reordering
    if (type === 'list') {
      const newBoards = Array.from(lists);
      const [removed] = newBoards.splice(source.index, 1);
      newBoards.splice(destination.index, 0, removed);
      setLists(newBoards);
      return;
    }

    // Handle task movement between lists
    const sourceBoard = lists.find(list => list.id === source.droppableId);
    const destBoard = lists.find(list => list.id === destination.droppableId);
    const task = sourceBoard.tasks.find(task => task.id === draggableId);

    // Remove from source list
    const newSourceTasks = Array.from(sourceBoard.tasks);
    newSourceTasks.splice(source.index, 1);

    // Add to destination list
    const newDestTasks = Array.from(destBoard.tasks);
    newDestTasks.splice(destination.index, 0, task);

    setLists(lists.map(list => {
        if (list.id === source.droppableId) {
        //   console.log("list.id = ", list.id, ",source.droppableId=", source.droppableId, ", distination.droppable.id=", destination.droppableId)
          return { ...list, tasks: newSourceTasks };
        }
        if (list.id === destination.droppableId) {
        //   console.log("list.id = ", list.id, ",source.droppableId=", source.droppableId, ", distination.droppable.id=", destination.droppableId)
        return { ...list, tasks: newDestTasks };
      }
      return list;
    }));
  };

  return (
    <div className="board">
      <h1>My Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="lists" type="list" direction="horizontal">
          {(provided, snapshot) => (
            <div
              className={`lists-container ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {lists.map((list, index) => (
                <List
                  key={list.id}
                  list={list}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
