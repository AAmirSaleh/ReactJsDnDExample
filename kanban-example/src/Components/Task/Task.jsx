import {Draggable} from '@hello-pangea/dnd';

function Task({ task, index }) {
  return (
    // Draggable wraps each task. It needs a unique draggableId and its index.
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}   // positional styles applied during drag
          {...provided.dragHandleProps}  // makes the whole card the drag handle
          style={{
            userSelect: "none",
            padding: "12px 14px",
            marginBottom: 8,
            borderRadius: 8,
            background: snapshot.isDragging ? "#e0f0ff" : "#ffffff",
            boxShadow: snapshot.isDragging
              ? "0 8px 24px rgba(0,0,0,0.18)"
              : "0 1px 3px rgba(0,0,0,0.10)",
            border: snapshot.isDragging ? "1.5px solid #4a90e2" : "1.5px solid transparent",
            fontSize: 14,
            color: "#1a1a2e",
            fontFamily: "'DM Sans', sans-serif",
            transition: "box-shadow 0.15s, border 0.15s",
            cursor: "grab",
            // IMPORTANT: spread the style from provided.draggableProps last
            // so dnd can override positioning during drag
            ...provided.draggableProps.style,
          }}
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
}

export default Task