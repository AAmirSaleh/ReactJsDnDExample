import { useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Board from "../Board/Board";

const initialData = {
  workspace: {
    boards: {
      "board-1": {
        id: "board-1",
        title: "To Do",
        taskIds: ["task-1", "task-2"],
      },
      "board-2": {
        id: "board-2",
        title: "Doing",
        taskIds: ["task-3", "task-4", "task-5"],
      },
      "board-3": {
        id: "board-3",
        title: "Done",
        taskIds: [],
      },
    },
    tasks: {
      "task-1": { id: "task-1", title: "Design wireframes" },
      "task-2": { id: "task-2", title: "Write project brief" },
      "task-3": { id: "task-3", title: "Build API endpoints" },
      "task-4": { id: "task-4", title: "Set up database schema" },
      "task-5": { id: "task-5", title: "Implement auth flow" },
    },
    // order of boards
    boardOrder: ["board-1", "board-2", "board-3"],
  },
};


export default function Workspace() {
  const [data, setData] = useState(initialData.workspace);

  // Called by @hello-pangea/dnd when a drag ends
  const onDragEnd = (result) => {

    const { destination, source, draggableId, type } = result;
    console.log("dragging..., type=", type)
    // Dropped outside any droppable → do nothing
    if (!destination) {
      console.log("no destination , returning...")
      return;  
    } 
    
    console.log("destination index=", destination.index, "source index=", source.index, "destination droppableId = ", destination.draggableId, "source droppableId=", source.droppableId)
    // Dropped in the same position → do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
        console.log("dropped to same pos, returning...")
        return;
    }

     // Handle list reordering
    if (type === 'COLUMN') {
      const newBoards = Array.from(data.boards);
      const [removed] = newBoards.splice(source.index, 1);
      newBoards.splice(destination.index, 0, removed);
      setData(prev => ({...prev, newBoards}));
      return;
    }

    const sourceBoard = data.boards[source.droppableId];
    const destBoard = data.boards[destination.droppableId];

    // ── Same board reorder ──
    console.log("source.index", source.index)
    if (type === "CARD" && sourceBoard.id === destBoard.id) {
      const newTaskIds = Array.from(sourceBoard.taskIds);
      newTaskIds.splice(source.index, 1);          // remove from old position
      newTaskIds.splice(destination.index, 0, draggableId); // insert at new position

      setData((prev) => ({
        ...prev,
        boards: {
          ...prev.boards,
          [sourceBoard.id]: { ...sourceBoard, taskIds: newTaskIds },
        },
      }));
      return;
    }

    // ── Cross-board move ──
    console.log("sourceBoard", sourceBoard)
    const sourceTaskIds = Array.from(sourceBoard.taskIds);
    sourceTaskIds.splice(source.index, 1);

    const destTaskIds = Array.from(destBoard.taskIds);
    destTaskIds.splice(destination.index, 0, draggableId);

    setData((prev) => ({
      ...prev,
      boards: {
        ...prev.boards,
        [sourceBoard.id]: { ...sourceBoard, taskIds: sourceTaskIds },
        [destBoard.id]: { ...destBoard, taskIds: destTaskIds },
      },
    }));
  };

  return (
    <>
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap');`}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          padding: "40px 32px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* App title */}
        <h1
          style={{
            color: "#e2e8f0",
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 32,
            letterSpacing: "-0.02em",
          }}
        >
          🗂 My Workspace
        </h1>

        {/* DragDropContext must wrap ALL Droppables and Draggables.
            onDragEnd is the single required callback. */}
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                        {data.boardOrder.map((boardId, nextI) => {
                            // console.log("nextI : " , nextI, "boardId", boardId)
                            const board = data.boards[boardId];
                            // Resolve task objects from IDs
                            const tasks = board.taskIds.map((id) => data.tasks[id]);
                            return <Board key={board.id} board={board} tasks={tasks} i={nextI} />
                            //return <Board key={board.id} board={board} tasks={tasks} i={nextI} />;
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}
