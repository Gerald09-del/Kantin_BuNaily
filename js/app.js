document.addEventListener('DOMContentLoaded', async function() {
    const viewMitraBtn = document.getElementById('viewMitra');
    const viewProductsBtn = document.getElementById('viewProducts');
    const content = document.getElementById('content');

    let mitraData = [];
    let productData = [];

    // Load data from JSON files
    async function loadData() {
        try {
            const mitraResponse = await fetch('data/tabel_mitra_rows.json');
            mitraData = await mitraResponse.json();
            const productResponse = await fetch('data/tabel_product_rows.json');
            productData = await productResponse.json();
        } catch (error) {
            console.log('Fallback to hardcoded data (file:// protocol limitation)');
            mitraData = [{"mitra_id":"639aa95a-a97b-4e54-970b-6bd77a131405","nama_mitra":"bu Naily","owner_name":"Naily","email":"nailimasudah74@gmail.com","alamat":"Jl. Margorejo, 3D/82, Surabaya, Jawa Timur","kategori":"Food and Beverages","sekolah":"SMA Hang Tuah 2 Sidoarjo"}];
            productData = [{"product_id":"17b96491-3167-43c1-8f1e-725b4a85ca0d","mitra_id":"639aa95a-a97b-4e54-970b-6bd77a131405","nama_produk":" good day frezz","harga":"6.000","stok":"24","kategori":"MINUMAN","foto_url":"https://drive.google.com/uc?id=1T81WCgV6Ou2cmWptsm5uIu9YHgn37UrC","sekolah":"SMA HANG TUAH 2"}];
        }
    }

    await loadData();

    viewMitraBtn.addEventListener('click', showMitraList);
    viewProductsBtn.addEventListener('click', showProductList);

    function showMitraList() {
        content.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        wrapper.style.minHeight = '400px';
        wrapper.style.maxHeight = '80vh';
        wrapper.style.overflowY = 'auto';
        wrapper.innerHTML = '<h2 style="text-align: center; font-size: 2.5rem; color: #2c3e50; margin-bottom: 40px;">Daftar Mitra</h2><div class="mitra-container"></div>';
        content.appendChild(wrapper);
        if (mitraData.length === 0) {
            wrapper.querySelector('.mitra-container').innerHTML = '<p style="text-align: center; font-size: 1.5rem; color: #7f8c8d;">Loading...</p>';
            return;
        }
        const container = wrapper.querySelector('.mitra-container');
        mitraData.forEach(mitra => {
            const card = document.createElement('div');
            card.className = 'mitra-card';
            const initials = mitra.owner_name ? mitra.owner_name.charAt(0).toUpperCase() : 'M';
            card.innerHTML = `
                <div class="mitra-avatar">${initials}</div>
                <h3>${mitra.nama_mitra}</h3>
                <div class="mitra-info">
                    <p><strong>Owner:</strong> ${mitra.owner_name}</p>
                    <p><strong>Email:</strong> ${mitra.email}</p>
                    <p class="mitra-kategori"><strong>Kategori:</strong> ${mitra.kategori}</p>
                </div>
                <button class="mitra-detail-btn">Detail</button>
            `;
            const detailBtn = card.querySelector('.mitra-detail-btn');
            detailBtn.addEventListener('click', () => showMitraDetail(mitra));
            container.appendChild(card);
        });
    }

    function showProductList() {
        content.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        wrapper.style.minHeight = '400px';
        wrapper.style.maxHeight = '80vh';
        wrapper.style.overflowY = 'auto';

        const h2 = document.createElement('h2');
        h2.textContent = 'Daftar Produk';
        wrapper.appendChild(h2);

        const bgElements = ['🍕', '🍔', '🥤', '🍹', '☕'];
        bgElements.forEach((emoji, index) => {
            const bg = document.createElement('div');
            bg.className = 'bg-element';
            bg.textContent = emoji;
            bg.style.left = (10 + index * 15) + '%';
            bg.style.animationDelay = (index * 2) + 's';
            wrapper.appendChild(bg);
        });

        if (productData.length === 0) {
            const p = document.createElement('p');
            p.textContent = 'Loading...';
            wrapper.appendChild(p);
        } else {
            const container = document.createElement('div');
            container.className = 'product-container';
            productData.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${product.foto_url}" alt="${product.nama_produk}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                    <h3>${product.nama_produk}</h3>
                    <p><strong>Harga:</strong> Rp ${product.harga}</p>
                    <p><strong>Stok:</strong> ${product.stok}</p>
                    <p><strong>Kategori:</strong> ${product.kategori}</p>
                    <button class="detail">Detail</button>
                `;
                const detailBtn = card.querySelector('.detail');
                detailBtn.addEventListener('click', () => showProductDetail(product));
                container.appendChild(card);
            });
            wrapper.appendChild(container);
        }
        content.appendChild(wrapper);
    }

    function showMitraDetail(mitra) {
        const modal = document.createElement('div');
        modal.className = 'mitra-modal';
        modal.innerHTML = `
            <div class="mitra-modal-content">
                <button class="mitra-modal-close" onclick="this.closest('.mitra-modal').remove()">×</button>
                <h2>Detail Mitra</h2>
                <p><strong>Nama Mitra:</strong> ${mitra.nama_mitra}</p>
                <p><strong>Owner:</strong> ${mitra.owner_name}</p>
                <p><strong>Email:</strong> ${mitra.email}</p>
                <p><strong>Alamat:</strong> ${mitra.alamat}</p>
                <p><strong>Kategori:</strong> ${mitra.kategori}</p>
                <p><strong>Sekolah:</strong> ${mitra.sekolah}</p>
            </div>
        `;
        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('active'));
        modal.querySelector('.mitra-modal-content').addEventListener('click', e => e.stopPropagation());
        modal.addEventListener('click', () => modal.remove());
    }

    function showProductDetail(product) {
        content.innerHTML = `
            <h2>Detail Produk</h2>
            <p><strong>Nama Produk:</strong> ${product.nama_produk}</p>
            <p><strong>Harga:</strong> Rp ${product.harga}</p>
            <p><strong>Stok:</strong> ${product.stok}</p>
            <p><strong>Kategori:</strong> ${product.kategori}</p>
            <p><strong>Sekolah:</strong> ${product.sekolah}</p>
            <p><strong>Foto:</strong> <a href="${product.foto_url}" target="_blank">Lihat Foto</a></p>
            <button class="back" onclick="location.reload()">Kembali</button>
        `;
    }
});
