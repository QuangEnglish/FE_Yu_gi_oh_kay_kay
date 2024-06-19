document.addEventListener('DOMContentLoaded', function () {
    fetchProducts();
    fetchUserInformation();
    window.onpopstate = function(event) {
        if (event.state) {
            loadContent(event.state.page);
        }
    };
});

async function fetchUserInformation() {
    try {
        const response = await fetch(`https://api.example.com/userInformation?search=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        document.getElementById('username').textContent = data.username;
        document.getElementById('total-bought').textContent = data.totalBought;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function fetchProducts(query = '') {
    try {
        const response = await fetch(`https://api.example.com/products?search=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear current content

    let itemRow;
    let index = 0;
    products.forEach(product => {
        // Tạo một hàng mới cứ mỗi 4 sản phẩm
        if (index % 4 === 0) {
            itemRow = document.createElement('div');
            itemRow.classList.add('item-row');
            productList.appendChild(itemRow);
        }

        const item = document.createElement('div');
        item.classList.add('item');

        const image = document.createElement('img');
        image.src = product.imageUrl;
        image.alt = product.name;
        item.appendChild(image);

        const name = document.createElement('h3');
        name.textContent = product.name;
        item.appendChild(name);

        const stock = document.createElement('p');
        stock.classList.add('stock');
        stock.innerHTML = `Stock:<span>$${formatPrice(product.stock)}</span>`;
        item.appendChild(stock);

        const price = document.createElement('p');
        price.classList.add('price');
        price.innerHTML = `<span>$${formatPrice(product.price)}</span><span><i class="fa-solid fa-cart-shopping"></i></span>`;
        price.onclick = (event) => {
            showPurchaseMockup(event);
        };
        item.appendChild(price);

        itemRow.appendChild(item);
        index++;
    });
}

function searchProduct() {
    const input = document.getElementById('search-input').value.toLowerCase();
    fetchProducts(input);
}

function clearFilter() {
    document.getElementById('search-input').value = '';
    fetchProducts();
}

function formatPrice(price) {
    // Format price with comma separator for thousands
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showMockup(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
    document.getElementById('mockup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hideMockup() {
    document.getElementById('mockup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function showPurchaseMockup(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
    document.getElementById('purchase-mockup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hidePurchaseMockup() {
    document.getElementById('purchase-mockup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('purchase-form').reset();
}

function showOwnerMockup(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
    document.getElementById('owner-mockup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hideOwnerMockup() {
    document.getElementById('owner-mockup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Toggle user dropdown menu
function toggleUserMenu() {
    var dropdown = document.getElementById("user-dropdown");
    dropdown.classList.toggle("show");
}

// Toggle chat popup
function toggleChatPopup() {
    var popup = document.getElementById("chat-popup");
    popup.style.display = (popup.style.display === "block") ? "none" : "block";
}

function changePassword() {
    window.location.href = "../../app/page/change-password.html";
}

async function deleteAccount() {
    // Hiển thị thông báo xác nhận
    const isConfirmed = confirm('Are you sure you want to delete your account?');
    // Nếu người dùng nhấn OK
    if (isConfirmed) {
        try {
            // Gọi API để xóa tài khoản
            const response = await fetch('URL_API_XOA_TAI_KHOAN', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            // Kiểm tra xem API trả về kết quả thành công hay không
            if (response.ok) {
                // Chuyển hướng đến trang đăng nhập
                window.location.href = '../../app/page/sign-in.html';
            } else {
                // Hiển thị thông báo lỗi nếu API trả về lỗi
                const errorData = await response.json();
                alert('Account deletion failed: ' + errorData.message);
            }
        } catch (error) {
            // Xử lý lỗi nếu có sự cố trong quá trình gọi API
            alert('Error! An error occurred. Please try again later: ' + error.message);
        }
    } else {
        // Người dùng nhấn Cancel, không làm gì cả
        alert('Cancel account deletion');
    }
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

    document.getElementById('purchase-form').reset();
}