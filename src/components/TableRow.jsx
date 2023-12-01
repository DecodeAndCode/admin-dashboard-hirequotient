import React, { useEffect } from 'react';

const TableRow = ({
                      user,
                      editableUserId,
                      editedValue,
                      handleEdit,
                      handleSave,
                      handleDelete,
                      setEditedValue,
                      isSelected,
                      handleSelectRow,
                  }) => {
    useEffect(() => {
        setEditedValue({
            name: user.name,
            email: user.email,
            role: user.role,
        });
    }, [user, setEditedValue]);

    const handleInputChange = (e, field) => {
        setEditedValue((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleSaveLocal = () => {
        handleSave(user.id);
    };

    return (
        <tr key={user.id} className={isSelected ? 'selected-row' : ''}>
            <td>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectRow(user.id)}
                />
            </td>
            <td>
                {editableUserId === user.id ? (
                    <input
                        type="text"
                        value={editedValue.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                    />
                ) : (
                    user.name
                )}
            </td>
            <td>
                {editableUserId === user.id ? (
                    <input
                        type="text"
                        value={editedValue.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                    />
                ) : (
                    user.email
                )}
            </td>
            <td>
                {editableUserId === user.id ? (
                    <input
                        type="text"
                        value={editedValue.role}
                        onChange={(e) => handleInputChange(e, 'role')}
                    />
                ) : (
                    user.role
                )}
            </td>
            <div style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center"
            }}>
            <td>
                {editableUserId === user.id ? (
                    <button onClick={handleSaveLocal}>Save</button>
                ) : (
                    <>
                        <button onClick={() => handleEdit(user.id)}>Edit</button>
                        <span>  </span>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </>
                )}
            </td>
            </div>
        </tr>
    );
};

export default TableRow;
