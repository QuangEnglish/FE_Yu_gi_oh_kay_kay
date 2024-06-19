async function getRevenue() {
    try {
        const response = await fetch('https://api.example.com/revenue');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const revenue = await response.json();
        alert('Revenue: $' + revenue.total); // Display revenue in an alert for simplicity
    } catch (error) {
        console.error('Error fetching revenue:', error);
    }
}

function showItemsManagement() {
    document.getElementById('items-management').style.display = 'block';
}

function submitPurchaseForm(event) {
    event.preventDefault();
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value;

    // Tạo formData để gửi dữ liệu lên server
    const formData = new FormData();
    formData.append('quantity', quantity);
    formData.append('address', address);

    // Gọi API để thêm sản phẩm mới
    fetch('https://api.example.com/products', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            return response.json();
        })
        .then(data => {
            console.log('Successful purchase:', data);
            alert('Successful purchase!');
        })
        .catch(error => {
            console.error('Error adding product:', error);
            alert('Failed to add product. Please try again.');
        });

    document.getElementById('product-form').reset();
}

function previewImage(event) {
    const input = event.target;
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            const imgPreview = document.getElementById('image-preview');
            imgPreview.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
}
