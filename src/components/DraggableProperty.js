import { useDrag } from "react-dnd";

function DraggableProperty({ property, onRemove }) {
  const [{ isDragging }, drag] = useDrag({
    type: "PROPERTY",
    item: { property },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="draggable-property"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <p>{property.title}</p>
      <button onClick={() => onRemove(property.id)}>Remove</button>
    </div>
  );
}

export default DraggableProperty;