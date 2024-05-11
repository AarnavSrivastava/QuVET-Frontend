export default function ListBuilder({ items, renderItem, className }: any) {
    return (
        <div className={className}>
            {items.map((item: any, index: number) => (
                <div key={index}>
                    {renderItem(item, index)}
                </div>
            ))}
        </div>
    )
}