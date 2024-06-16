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

function submitProductForm(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const imageFile = document.getElementById('product-upload-image').files[0];

    // Tạo formData để gửi dữ liệu lên server
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (imageFile) {
        formData.append('imageFile', imageFile);
    }

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
            console.log('Product added successfully:', data);
            alert('Product added successfully!');
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
