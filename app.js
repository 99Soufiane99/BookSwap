// async function chargerDemandes() {
//   const reponse = await fetch('http://127.0.0.1:8000/api/v1/exchange-requests?status=open');
//   if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`);
//   const resultat = await reponse.json();
//   console.log(resultat.data);
// }

// chargerDemandes();

const bookMenu = document.querySelector("#book-menu")
const modaleContent = document.querySelector("#modal-content")
const bookModal = document.querySelector("#book-modal")
const closeModal = document.querySelector("#close-modal")
const serch = document.querySelector("#search")
const btsearch = document.querySelector("#bt-search")

const data   = []

async function documentt(){
  const reponse = await fetch('http://127.0.0.1:8000/api/v1/books?page=1')
  resulta = await reponse.json()
  bookMenu.innerHTML = ``
  resulta.data.forEach( d=>{
    bookMenu.innerHTML += `
    <div class="flex flex-wrap gap-2 p-5 m-5">

    <div class="w-64 bg-green-100 rounded-xl p-4">

        <img
            src="http://127.0.0.1:8000${d.image_url}"
            alt="${d.title}"
            class="w-full h-40 object-contain mb-3"
        >

        <h3 class="font-bold text-gray-800">
            ${d.title}
        </h3>

        <p class="text-sm text-gray-600 mt-1">
            ${d.author}
        </p>

        <p class="text-sm text-gray-500 mt-2">
            ${d.description}
        </p>

        <span class="inline-block text-xs text-green-700 mt-2">
            ${d.category.name}
        </span>

        <p class="text-sm text-gray-600 mt-2">
            ${d.owner.name}
        </p>

        <button id="${d.id}" class="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg mt-4">
            Voir les détails
        </button>

    </div>

</div>
  `

})
}

bookMenu.addEventListener("click", (event)=>{
  if(event.target.tagName === "BUTTON"){
    let id = event.target.id
    fetch(`http://127.0.0.1:8000/api/v1/books/${id}`)
    .then(response=>{
      return response.json()
    })
    .then(result =>{
      let book = result.data;
      modaleContent.innerHTML = `
                   <div class="bg-white rounded-xl">

            <!-- Book Image -->
            <div class="bg-green-50 rounded-xl p-5 flex justify-center">
                <img
                    src="http://127.0.0.1:8000${book.image_url}"
                    alt="${book.title}"
                    class="h-40 object-contain"
                >
            </div>

            <!-- Book Information -->
            <div class="mt-5">

                <div class="flex justify-between items-center mb-3">

                    <span class="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        ${book.category.name}
                    </span>

                    <span class="text-xs text-gray-400">
                        #${book.id}
                    </span>

                </div>

                <h2 class="text-xl font-bold text-gray-800">
                    ${book.title}
                </h2>

                <p class="text-sm text-gray-500 mt-1">
                    Par ${book.author}
                </p>

                <p class="text-sm text-gray-600 mt-3 leading-relaxed">
                    ${book.description}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mt-4">
                    ${book.tags.map(tag => `
                        <span class="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                            ${tag}
                        </span>
                    `).join("")}
                </div>

                <!-- Owner -->
                <div class="flex items-center gap-3 border-t border-gray-100 mt-5 pt-4">

                    <img
                        src="http://127.0.0.1:8000${book.owner.avatar}"
                        alt="${book.owner.name}"
                        class="w-10 h-10 rounded-full object-cover"
                    >

                    <div>
                        <p class="text-sm font-semibold text-gray-800">
                            ${book.owner.name}
                        </p>

                        <p class="text-xs text-gray-500">
                            ${book.owner.group_name}
                        </p>

                        <p class="text-xs text-gray-500">
                            ${book.owner.email}
                        </p>
                    </div>

                </div>

                <p class="text-xs text-gray-400 mt-4">
                    Ajouté le : ${new Date(book.created_at).toLocaleDateString("fr-FR")}
                </p>

            </div>
        </div>
      `
    })
    bookModal.classList.remove("hidden")
  }
})

closeModal.addEventListener("click", a=>{
  bookModal.classList.add("hidden")
})

btsearch.addEventListener("click", event=>{
    fetch(``)
})

documentt()


