document.addEventListener('DOMContentLoaded', function() {
  const products = [
      { 
          name: "Эко-сөмке", 
          price: 2000, 
          image: "https://via.placeholder.com/300x200?text=Эко-сөмке",
          category: "сөмкелер"
      },
      { 
          name: "Бамбук щеткасы", 
          price: 1500, 
          image: "https://via.placeholder.com/300x200?text=Бамбук+щеткасы",
          category: "гигиена"
      },
      { 
          name: "Эко-ыдыс", 
          price: 3000, 
          image: "https://via.placeholder.com/300x200?text=Эко-ыдыс",
          category: "азық-түлік"
      },
      { 
          name: "Қайта өңделген қағаз қалта", 
          price: 500, 
          image: "https://via.placeholder.com/300x200?text=Қағаз+қалта",
          category: "канцелярия"
      },
      { 
          name: "Табиғи сабын", 
          price: 1200, 
          image: "https://via.placeholder.com/300x200?text=Табиғи+сабын",
          category: "гигиена"
      },
      { 
          name: "Ағаш тіс щеткасы", 
          price: 1800, 
          image: "https://via.placeholder.com/300x200?text=Тіс+щеткасы",
          category: "гигиена"
      }
  ];

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const searchResults = document.getElementById('searchResults');

  // Іздеу функциясы
  function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      
      if (query === '') {
          displayAllProducts();
          return;
      }

      const filteredProducts = products.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.category.toLowerCase().includes(query)
      );

      displayResults(filteredProducts);
  }

  // Барлық өнімдерді көрсету
  function displayAllProducts() {
      displayResults(products);
  }

  // Нәтижелерді көрсету
  function displayResults(results) {
      searchResults.innerHTML = '';

      if (results.length === 0) {
          searchResults.innerHTML = `
              <div class="no-results">
                  <i class="fas fa-search" style="font-size: 40px; margin-bottom: 15px;"></i>
                  <h3>Өнім табылмады</h3>
                  <p>Сіз іздеген өнім жоқ немесе қате терілген</p>
              </div>
          `;
          return;
      }

      results.forEach(product => {
          const productCard = document.createElement('div');
          productCard.className = 'product-card';
          productCard.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <div class="product-info">
                  <h3>${product.name}</h3>
                  <p>${product.price} ₸</p>
                  <button class="add-to-cart-btn">Себетке қосу</button>
              </div>
          `;
          searchResults.appendChild(productCard);
      });
  }

  // Іздеу түймесін басу
  searchBtn.addEventListener('click', performSearch);

  // Enter пернесімен іздеу
  searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          performSearch();
      }
  });

  // Бет жүктегенде барлық өнімдерді көрсету
  displayAllProducts();
});