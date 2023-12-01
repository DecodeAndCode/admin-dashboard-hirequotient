import React from 'react';
import TableRow from './TableRow';

const TableBody = ({
                       data,
                       editableUserId,
                       editedValue,
                       handleEdit,
                       handleSave,
                       handleDelete,
                       setEditedValue,
                       selectedRows,
                       handleSelectRow,
                   }) => {
    return (
        <tbody>
        {data.map((user) => (
            <TableRow
                key={user.id}
                user={user}
                editableUserId={editableUserId}
                editedValue={editedValue}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleDelete={handleDelete}
                setEditedValue={setEditedValue}
                isSelected={selectedRows.includes(user.id)}
                handleSelectRow={handleSelectRow}
            />
        ))}
        </tbody>
    );
};

export default TableBody;
