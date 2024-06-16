document.addEventListener('DOMContentLoaded', function () {
    fetchProducts();
    window.onpopstate = function(event) {
        if (event.state) {
            loadContent(event.state.page);
        }
    };
});

async function fetchProducts() {
    try {
        const response = await fetch('https://api.example.com/products');
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

        const price = document.createElement('p');
        price.classList.add('price');
        price.innerHTML = `<span>$${formatPrice(product.price)}</span><span><i class="fa-solid fa-cart-shopping"></i></span>`;
        item.appendChild(price);

        itemRow.appendChild(item);
        index++;
    });
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
    alert('Change Password clicked');
}

function deleteAccount() {
    alert('Delete Account clicked');
}
