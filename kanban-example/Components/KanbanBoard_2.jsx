import Board from "./Board";
import "./KanbanBoard_2.css"
import { DragDropContext, Droppable} from '@hello-pangea/dnd';
import jsonData from '../src/data.json'
import { useState } from "react";
const Workspace = () => {

    const [data, setData] = useState(jsonData)

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return; // Dropped outside
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const startColumn = data.columns[source.droppableId];
        const finishColumn = data.columns[destination.droppableId];

        // Reordering in the same column
        if (startColumn === finishColumn) {
            const newTaskIds = Array.from(startColumn.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = { ...startColumn, taskIds: newTaskIds };
            setData({ ...data, columns: { ...data.columns, [newColumn.id]: newColumn } });
            return;

        }
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>

                
                <Droppable droppableId="workspace-1" direction="horizontal">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="droppableComp">
                            {/* {console.log(jsonData)} */}
                        {/* Draggable items go here */}

                        {
                            console.log("data : ", data)
                        }
                       {
                        
                        
                       data.columnOrder.map((board, i) => {
                                const ids = data.columns[board.id].taskIds
                                const taskList = ids.map((id => data.tasks.filter(task => task.taskId === id)))
                                console.log("ids :", ids, ", taskList:", taskList)
                                if(taskList) {
                                    return <Board keyVal={board.key} id={board.id} id2={board["list-id"]} index={i} tasks={taskList} />
                                }
                            }
                        )

                        
                        }
                        {
                            console.log("Done.")
                        }
                        {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                
            </DragDropContext>

        </>
    )
}

export default Workspace;