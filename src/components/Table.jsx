import React, { useState, useEffect } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from './Pagination.jsx';
import './Table.css';

const Table = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editableUserId, setEditableUserId] = useState(null);
    const [editedValue, setEditedValue] = useState({
        name: '',
        email: '',
        role: '',
    });
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false); // New state for select all checkbox
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
                );
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredData = data.filter((user) =>
        Object.values(user).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handleEdit = (userId) => {
        setEditableUserId(userId);
        const userToEdit = data.find((user) => user.id === userId);
        setEditedValue({
            name: userToEdit.name,
            email: userToEdit.email,
            role: userToEdit.role,
        });
    };

    const handleSave = () => {
        setEditableUserId(null);
        setData((prevData) =>
            prevData.map((prevUser) =>
                prevUser.id === editableUserId ? { ...prevUser, ...editedValue } : prevUser
            )
        );
        setEditedValue({
            name: '',
            email: '',
            role: '',
        });
    };

    const handleDelete = (userId) => {
        setData((prevData) => prevData.filter((user) => user.id !== userId));
        setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((rowId) => rowId !== userId));
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setSelectAllChecked(false); // Reset select all checkbox when changing the page
    };

    const handleSelectRow = (userId) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(userId)) {
                return prevSelectedRows.filter((rowId) => rowId !== userId);
            } else {
                return [...prevSelectedRows, userId];
            }
        });
    };

    const handleSelectAll = () => {
        setSelectAllChecked(!selectAllChecked);
        setSelectedRows(
            selectAllChecked
                ? [] // Unselect all if select all was checked
                : filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((user) => user.id)
        );
    };

    const handleDeleteSelected = () => {
        setData((prevData) => prevData.filter((user) => !selectedRows.includes(user.id)));
        setSelectedRows([]);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <br/>
            <br/>
            <table>
                <TableHeader
                    selectAllChecked={selectAllChecked}
                    handleSelectAll={handleSelectAll}
                />
                <TableBody
                    data={filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
                    editableUserId={editableUserId}
                    editedValue={editedValue}
                    handleEdit={handleEdit}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    setEditedValue={setEditedValue}
                    selectedRows={selectedRows}
                    handleSelectRow={handleSelectRow}
                />
            </table>
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                >
                    First
                </button>
                <span>  </span>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span>  </span>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <span>  </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
                <span>  </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                >
                    Last
                </button>
            </div>
            <br/>
            <button
                className="delete-selected-button"
                onClick={handleDeleteSelected}
                disabled={selectedRows.length === 0}
            >
                Delete Selected
            </button>
        </div>
    );
};

export default Table;
