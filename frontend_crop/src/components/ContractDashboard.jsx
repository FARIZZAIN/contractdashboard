import React, { useEffect, useState } from 'react';
import './ContractDashboard.css';

const ContractDashboard = () => {
    const [contracts, setContracts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [newContract, setNewContract] = useState({
        customerName: '',
        produceType: '',
        amount: '',
        price: '',
        deliveryDate: '',
        imageUrl: '',
        status: 'Pending'
    });

    const [farmerVegetables, setFarmerVegetables] = useState([
        { name: "Tomatoes", imageUrl: "https://example.com/tomatoes.jpg" },
        { name: "Carrots", imageUrl: "https://example.com/carrots.jpg" },
        { name: "Potatoes", imageUrl: "https://example.com/potatoes.jpg" },
        { name: "Cucumbers", imageUrl: "https://example.com/cucumbers.jpg" }
    ]);

    const [showVegetableForm, setShowVegetableForm] = useState(false);
    const [newVegetable, setNewVegetable] = useState({ name: '', imageUrl: '' });

    useEffect(() => {
        const farmerContracts = [
            {
                _id: "1",
                customerName: "John Doe",
                produceType: "Tomatoes",
                amount: 500,
                price: 1500,
                deliveryDate: "2023-09-01",
                imageUrl: "https://example.com/tomatoes.jpg",
                status: "Pending"
            },
            {
                _id: "2",
                customerName: "Alice Smith",
                produceType: "Carrots",
                amount: 1000,
                price: 2000,
                deliveryDate: "2023-09-10",
                imageUrl: "https://example.com/carrots.jpg",
                status: "Completed"
            }
        ];
        setContracts(farmerContracts);
    }, []);

    const toggleForm = () => {
        setShowForm(!showForm);
        setIsEditing(false);
        setNewContract({
            customerName: '',
            produceType: '',
            amount: '',
            price: '',
            deliveryDate: '',
            imageUrl: '',
            status: 'Pending'
        });
    };

    const handleInputChange = (e) => {
        setNewContract({ ...newContract, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            const updatedContracts = contracts.map((contract) =>
                contract._id === editId ? { ...newContract, _id: editId } : contract
            );
            setContracts(updatedContracts);
        } else {
            const newId = (contracts.length + 1).toString();
            const newContractWithId = { ...newContract, _id: newId };
            setContracts([...contracts, newContractWithId]);
        }

        setNewContract({
            customerName: '',
            produceType: '',
            amount: '',
            price: '',
            deliveryDate: '',
            imageUrl: '',
            status: 'Pending'
        });
        setShowForm(false);
        setIsEditing(false);
        setEditId(null);
    };

    const handleEdit = (contract) => {
        setNewContract(contract);
        setShowForm(true);
        setIsEditing(true);
        setEditId(contract._id);
    };

    const toggleVegetableForm = () => {
        setShowVegetableForm(!showVegetableForm);
        setNewVegetable({ name: '', imageUrl: '' });
    };

    const handleVegetableInputChange = (e) => {
        setNewVegetable({ ...newVegetable, [e.target.name]: e.target.value });
    };

    const handleVegetableFormSubmit = (e) => {
        e.preventDefault();
        setFarmerVegetables([...farmerVegetables, newVegetable]);
        setNewVegetable({ name: '', imageUrl: '' });
        setShowVegetableForm(false);
    };

    return (
        <>
            <div className="header">
                <h1>Farmer Dashboard</h1>
            </div>
            <div className="contract-dashboard">
                <h2>Vegetables Produced</h2>
                <button onClick={toggleVegetableForm}>Add Vegetable</button>
                {showVegetableForm && (
                    <form className="vegetable-form" onSubmit={handleVegetableFormSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Vegetable Name"
                            value={newVegetable.name}
                            onChange={handleVegetableInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={newVegetable.imageUrl}
                            onChange={handleVegetableInputChange}
                            required
                        />
                        <button type="submit">Add Vegetable</button>
                    </form>
                )}
                <table className="vegetables-table">
                    <thead>
                        <tr>
                            <th>Vegetable</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {farmerVegetables.map((vegetable, index) => (
                            <tr key={index}>
                                <td>{vegetable.name}</td>
                                <td><img src={vegetable.imageUrl} alt={vegetable.name} className="vegetable-image" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2>Previous Contracts</h2>
                <table className="contracts-table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Produce Type</th>
                            <th>Amount (units)</th>
                            <th>Price ($)</th>
                            <th>Delivery Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map((contract) => (
                            <tr key={contract._id}>
                                <td>{contract.customerName}</td>
                                <td>{contract.produceType}</td>
                                <td>{contract.amount}</td>
                                <td>{contract.price}</td>
                                <td>{new Date(contract.deliveryDate).toLocaleDateString()}</td>
                                <td>{contract.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2>Total Contracts: {contracts.length}</h2>

                <button onClick={toggleForm}>
                    {showForm ? "Cancel" : "Add New Contract"}
                </button>

                {showForm && (
                    <form className="contract-form" onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            name="customerName"
                            placeholder="Customer Name"
                            value={newContract.customerName}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="produceType"
                            placeholder="Produce Type"
                            value={newContract.produceType}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={newContract.amount}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={newContract.price}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="date"
                            name="deliveryDate"
                            value={newContract.deliveryDate}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={newContract.imageUrl}
                            onChange={handleInputChange}
                        />
                        <button type="submit">
                            {isEditing ? "Update Contract" : "Add Contract"}
                        </button>
                    </form>
                )}

                <div className="contract-list">
                    {contracts.map((contract) => (
                        <div className="contract-card" key={contract._id}>
                            <h3>Customer: {contract.customerName}</h3>
                            <p><strong>Produce:</strong> {contract.produceType}</p>
                            <p><strong>Amount:</strong> {contract.amount} units</p>
                            <p><strong>Price:</strong> ${contract.price}</p>
                            <p><strong>Delivery Date:</strong> {new Date(contract.deliveryDate).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> {contract.status}</p>
                            {contract.imageUrl && <img src={contract.imageUrl} alt={contract.produceType} className="produce-image" />}
                            <br />
                            <button onClick={() => handleEdit(contract)}>Edit</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ContractDashboard;