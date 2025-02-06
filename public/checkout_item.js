document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners for form submissions
    const addForm = document.getElementById('addForm');
    const updateForm = document.getElementById('updateForm');
    const deleteForm = document.getElementById('deleteForm');
    const viewButton = document.getElementById('viewRecords');

    // Handle adding a new record
    if (addForm) {
        addForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const Product = document.getElementById('addProduct').value;
            const Price = document.getElementById('addPrice').value;
            const Quantity = document.getElementById('addQuantity').value;
            const Discount = document.getElementById('addDiscount').value;
            const Total = document.getElementById('addTotal').value;

            try {
                const response = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Product, Price, Quantity, Discount, Total }),
                });

                if (response.ok) {
                    alert('Record added successfully!');
                } else {
                    const error = await response.text();
                    alert(`Failed to add record: ${error}`);
                }
            } catch (err) {
                console.error('Error:', err);
                alert('An error occurred while adding the record.');
            }
        });
    }

    // Handle updating an existing record
    if (updateForm) {
        updateForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const Product = document.getElementById('updateProduct').value;
            const Price = document.getElementById('updatePrice').value;
            const Quantity = document.getElementById('updateQuantity').value;
            const Discount = document.getElementById('updateDiscount').value;
            const Total = document.getElementById('updateTotal').value;

            try {
                const response = await fetch(`/api/checkout/${Product}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ Price, Quantity, Discount, Total }),
                });

                if (response.ok) {
                    alert('Record updated successfully!');
                } else {
                    const error = await response.text();
                    alert(`Failed to update record: ${error}`);
                }
            } catch (err) {
                console.error('Error:', err);
                alert('An error occurred while updating the record.');
            }
        });
    }

    // Handle deleting a record
    if (deleteForm) {
        deleteForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const Product = document.getElementById('deleteProduct').value;

            try {
                const response = await fetch(`/api/checkout/${Product}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Record deleted successfully!');
                } else {
                    const error = await response.text();
                    alert(`Failed to delete record: ${error}`);
                }
            } catch (err) {
                console.error('Error:', err);
                alert('An error occurred while deleting the record.');
            }
        });
    }

    // Handle viewing all records
    if (viewButton) {
        viewButton.addEventListener('click', async function () {
            try {
                const response = await fetch('/api/checkout', {
                    method: 'GET',
                });

                if (response.ok) {
                    const records = await response.json();
                    console.log('Records:', records);
                    alert('Check the console for records.');
                } else {
                    const error = await response.text();
                    alert(`Failed to fetch records: ${error}`);
                }
            } catch (err) {
                console.error('Error:', err);
                alert('An error occurred while fetching the records.');
            }
        });
    }
});
