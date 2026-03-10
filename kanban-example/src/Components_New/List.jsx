import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import Task from './Task';

const List = ({ list, index }) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`list ${snapshot.isDragging ? 'dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="list-header" {...provided.dragHandleProps}>
            <h3>{list.title}</h3>
            <span>{list.tasks.length} tasks</span>
          </div>
          
          <Droppable droppableId={list.id} type="task">
            {(provided, snapshot) => (
              <div
                className={`tasks-container ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
