// alltid bare være en handle
export function DisplayNameComponent({ displayName }: { displayName: string }) {
    return (
        <div className="flex items-center p-1 bg-white border rounded border-gray-400">
            <label className="p-3 bg-yellow-100 font-bold">{displayName}</label>
        </div>
    );
}
