import {Droppable, Draggable } from '@hello-pangea/dnd';
import Task from './Task/Task';
const Board = ({id, id2, keyVal, index, tasks})  => {
    return (
        <>
            {
                tasks.map((task => (
                    <div key={keyVal} style={{margin:"0 5px", padding:"5px", border:"1px solid blue"}}>

                    <Draggable draggableId={id} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            >
                                
                            <Droppable droppableId={id2}>
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef} className="droppableComp">
                                        {/* {console.log(jsonData)} */}
                                    {/* Draggable items go here */}

                                    {
                                        
                                    tasks.map((item, index) => (
                                        <Task key={item.key} content={item.content} index={index} id={item.taskId} />
                                    ))}
                                    {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>

                            {/* Item Content : {content} */}
                        </div>
                    )}
                    </Draggable>
                </div>
                )))
            }
            
        </>
    )
}

                                
export default Board