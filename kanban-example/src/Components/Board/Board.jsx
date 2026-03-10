import { Draggable, Droppable } from "@hello-pangea/dnd";
import Task from "../Task/Task";

function Board({i, board, tasks }) {
  return (
    <Draggable draggableId={board.id} index={i} >
        {(provided) => (
    <div  ref={provided.innerRef} {...provided.draggableProps}  {...provided.dragHandleProps}
      style={{
        background: "#f0f4f8",
        borderRadius: 12,
        padding: "14px 12px",
        width: 280,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        maxHeight: "80vh",
      }}
    >
      {/* Board header */}
      <h3
        style={{
          margin: "0 0 14px",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#4a5568",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {board.title}
         {/* <div className="column-header" {...provided.dragHandleProps}>
            {board.title} (Drag me!)
          </div> */}
        <span
          style={{
            marginLeft: 8,
            background: "#cbd5e0",
            borderRadius: "999px",
            padding: "1px 8px",
            fontSize: 11,
            fontWeight: 600,
            color: "#718096",
          }}
        >
          {tasks.length}
        </span>
      </h3>

      {/* Droppable defines a drop zone. droppableId must be unique. */}
      

        <Droppable droppableId={board.id} type="CARD">
            {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                {...provided.droppableProps}  // required props for the drop zone
                style={{
                background: snapshot.isDraggingOver ? "#dbeafe" : "transparent",
                borderRadius: 8,
                minHeight: 80,
                padding: 4,
                flex: 1,
                overflowY: "auto",
                transition: "background 0.2s",
                }}
            >
                {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
                ))}

                {/* Placeholder keeps the column height stable while dragging */}
                {provided.placeholder}
            </div>
            )}
        </Droppable>
        </div>
        )}

      </Draggable>
  );
}

export default Board