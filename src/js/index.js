// HTML ELEMENTS
jQuery(function() {
    const allCategories = document.getElementById("all");
    const jewelryCategory = document.getElementById("jewelry");
    const manCategory = document.getElementById("man");
    const womanCategory = document.getElementById("woman");
    const elecCategory = document.getElementById("electronics");
    const productsContainer = document.getElementById("productsContainer");

    // Function to display error messages
    function displayError(message) {
        productsContainer.innerHTML = `<div class="error-message bg-red-500 col-span-12 text-white p-4 rounded-md">${message}</div>`;
    }

    // Function to fetch all products
    async function getAllData() {
        try {
            var response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok) throw new Error("Failed to fetch data.");
            var data = await response.json();
            displayProducts(data);
        } catch (error) {
            console.error("Error fetching all products:", error);
            displayError("Failed to load products. Please try again later.");
        }
    }

    // Function to fetch specific category data
    async function getSpecificData(category) {
        try {
            var response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            if (!response.ok) throw new Error("Failed to fetch data.");
            var data = await response.json();
            productsContainer.innerHTML = ""; // Clear previous products
            displayProducts(data);
        } catch (error) {
            console.error(`Error fetching products for category ${category}:`, error);
            displayError(`Failed to load ${category} products. Please try again later.`);
        }
    }

    // Function to display products
    function displayProducts(arr) {
        productsContainer.innerHTML = ""; 
        for (var i = 0; i < arr.length; i++) {
            productsContainer.innerHTML += `
                <div class="col-span-12 sm:col-span-6 lg:col-span-4 rounded-[50px] bg-white rounded-bl-none flex flex-col justify-between relative w-full shadow-xl hover:-translate-y-4 hover:duration-300">
                    <div class="w-full">
                        <img src="${arr[i].image}" alt="" class="w-full h-[350px]">
                    </div>

                    <div class="pt-4 flex-grow w-full p-4">
                        <div class="relative" style="height: 45px;">
                            <h4 class="font-semibold overflow-hidden h-full">${arr[i].title}</h4> 
                            <i class="favt fa-solid fa-heart absolute right-[30px] text-2xl cursor-pointer text-gray-300"></i>
                        </div>
                        <p class="pt-2 text-slate-700 font-semibold text-xl">Price: ${arr[i].price} $</p>
                        <p class="pt-2 text-zinc-500">Category: ${arr[i].category}</p>

                        <div class="rate bg-zinc-600 p-2 px-3 rounded-xl w-fit mt-2">
                            <span class="text-white font-semibold">${arr[i].rating.rate}</span>
                            <i class="fa-solid fa-star text-yellow-400"></i>
                            <span class="text-neutral-300">from ${arr[i].rating.count}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    // Remove active class from all category buttons
    function removeActiveClass() {
        allCategories.classList.remove("active");
        jewelryCategory.classList.remove("active");
        elecCategory.classList.remove("active");
        manCategory.classList.remove("active");
        womanCategory.classList.remove("active");
    }

    // Category button event listeners
    jewelryCategory.addEventListener("click", function(e) {
        removeActiveClass();
        e.target.classList.add("active");
        getSpecificData("jewelery");
    });

    elecCategory.addEventListener("click", function(e) {
        removeActiveClass();
        e.target.classList.add("active");
        getSpecificData("electronics");
    });

    manCategory.addEventListener("click", function(e) {
        removeActiveClass();
        e.target.classList.add("active");
        getSpecificData("men's clothing");
    });

    womanCategory.addEventListener("click", function(e) {
        removeActiveClass();
        e.target.classList.add("active");
        getSpecificData("women's clothing");
    });

    allCategories.addEventListener("click", function(e) {
        removeActiveClass();
        e.target.classList.add("active");
        productsContainer.innerHTML = "";
        getAllData();
    });


    getAllData();

  
    $(".load").fadeOut(3000, function() {
        $("body").css({overflow: "auto"});
    });
});
