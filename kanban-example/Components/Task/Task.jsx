import { Draggable } from '@hello-pangea/dnd';
import './Task.css'

const Task = ({content, id, index})  => {
    return (
        <>
            <div style={{margin:"5px 0", padding:"5px", border:"1px solid blue"}}>

                <Draggable draggableId={id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                        Item Content : {content}
                    </div>
                )}
                </Draggable>
            </div>
        </>
    )
}


export default Task