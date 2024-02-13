export default function ListBuilder({ items, renderItem }) {
    return (
        <div>
            {items.map(item, index) => (
                <div key={index}>
                    {renderItem(item)}
                </div>
            )}
        </div>
    )
}