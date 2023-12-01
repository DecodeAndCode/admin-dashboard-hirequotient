import React from 'react';

const TableHeader = ({ selectAllChecked, handleSelectAll }) => {
    return (
        <thead>
        <tr>
            <th>
                <input
                    type="checkbox"
                    checked={selectAllChecked}
                    onChange={handleSelectAll}
                />
            </th>
            <th className="column-title">Name</th>
            <th className="column-title">Email</th>
            <th className="column-title">Role</th>
            <th className="column-title">Actions</th>
        </tr>
        </thead>
    );
};

export default TableHeader;
