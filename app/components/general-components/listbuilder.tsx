export default function ListBuilder({ items, renderItem, className, handleDelete }) {
    return (
        <div className={className}>
            {items.map((item, index) => (
                <div key={item.index}>
                    {renderItem({handleDelete}, item, index)}
                </div>
            ))}
        </div>
    )
}