class AdminPanel {
  constructor() {
    this.currentProductId = null
    this.products = this.loadProducts()
    this.originalProducts = JSON.parse(JSON.stringify(this.products)) // Deep copy for reset
    this.init()
  }

  init() {
    this.renderProductNavigation()
    this.bindEvents()
    this.updateStats()
  }

  loadProducts() {
    // Load products from localStorage or use default data
    const saved = localStorage.getItem("adminProducts")
    if (saved) {
      return JSON.parse(saved)
    }

    // Default product data (from original script.js)
    return {
      1: {
        title: "Anguilla Selvatica Viva",
        type: "Mar Mediterraneo",
        image: "./images/ang selv.png",
        badge: "SELVATICA",
        badgeClass: "wild-badge",
        price: "€25,00/Kg + IVA 10%",
        description:
          "Anguilla selvatica pescata direttamente nel Mar Mediterraneo. Prodotto fresco di altissima qualità, pescato con metodi tradizionali e sostenibili. Ideale per preparazioni gourmet e ristoranti di alta cucina.",
        features: [
          "Pescata in mare aperto",
          "Fresca e viva alla consegna",
          "Qualità premium garantita",
          "Metodi di pesca sostenibili",
          "Tracciabilità completa",
        ],
        specs: [
          "Confezione: Cassa da 3 Kg",
          "Origine: Mar Mediterraneo",
          "Stato: Viva",
          "Conservazione: Acqua corrente",
          "Consegna: 24-48 ore",
        ],
        whatsappText: "Anguilla Selvatica Viva - Mar Mediterraneo - Cassa da 3Kg - €25,00/Kg + IVA 10%",
      },
      2: {
        title: "Buratello Selvatico",
        type: "Anguilla giovane",
        image: "./images/angu allevate.png",
        badge: "SELVATICO",
        badgeClass: "wild-badge",
        price: "€22,00 + IVA 10%",
        description:
          "Buratello selvatico di prima qualità, anguilla giovane pescata in natura. Carne tenera e saporita, perfetta per preparazioni raffinate. Prodotto molto ricercato dai migliori chef.",
        features: [
          "Anguilla giovane selvatica",
          "Carne tenera e delicata",
          "Pescato in natura",
          "Qualità premium",
          "Molto ricercato dai chef",
        ],
        specs: [
          "Confezione: Cassa da 3 Kg",
          "Tipo: Buratello (giovane)",
          "Origine: Acque naturali",
          "Stato: Fresco",
          "Peso medio: 150-300g",
        ],
        whatsappText: "Buratello Selvatico - Cassa da 3Kg - €22,00 + IVA 10%",
      },
      3: {
        title: "Anguilla Selvatica Sfilettata",
        type: "Pronta per la cottura",
        image: "./images/1000123052 (1).jpg",
        badge: "SELVATICA",
        badgeClass: "wild-badge",
        price: "€26,00 + IVA",
        description:
          "Anguilla selvatica già sfilettata e pronta per la cottura. Lavorazione artigianale che mantiene intatte tutte le proprietà organolettiche. Perfetta per chi cerca praticità senza rinunciare alla qualità.",
        features: [
          "Già sfilettata professionalmente",
          "Pronta per la cottura",
          "Lavorazione artigianale",
          "Mantiene proprietà organolettiche",
          "Massima praticità",
        ],
        specs: [
          "Confezione: Cassa da 3 Kg",
          "Stato: Sfilettata fresca",
          "Lavorazione: Artigianale",
          "Conservazione: Refrigerata",
          "Utilizzo: Immediato",
        ],
        whatsappText: "Anguilla Selvatica Sfilettata - Cassa da 3Kg - €26,00 + IVA",
      },
      4: {
        title: "Anguilla Allevata Europa Viva",
        type: "Allevamento europeo",
        image: "./images/anguille.png",
        badge: "ALLEVAMENTO",
        badgeClass: "farmed-badge",
        price: "€25,00/Kg",
        description:
          "Anguilla proveniente da allevamenti europei certificati. Cresciuta in condizioni controllate che garantiscono qualità costante e sicurezza alimentare. Certificazione UE per massima trasparenza.",
        features: [
          "Allevamento europeo certificato",
          "Qualità costante garantita",
          "Sicurezza alimentare massima",
          "Crescita controllata",
          "Certificazione UE",
        ],
        specs: [
          "Confezione: Cassa da 3 Kg",
          "Origine: Allevamento UE",
          "Stato: Viva",
          "Certificazione: Europea",
          "Controlli: Veterinari regolari",
        ],
        whatsappText: "Anguilla Allevata Europa Viva - Cassa da 3Kg - €25,00/Kg",
      },
      5: {
        title: "Buratello Vivo Allevato Europa",
        type: "Anguilla giovane d'allevamento",
        image: "./images/Anguilla.png",
        badge: "ALLEVAMENTO",
        badgeClass: "farmed-badge",
        price: "€22,00/Kg",
        description:
          "Buratello proveniente da allevamenti europei di alta qualità. Anguilla giovane cresciuta in condizioni ottimali, con controlli veterinari costanti. Ideale per preparazioni delicate.",
        features: [
          "Allevamento europeo controllato",
          "Anguilla giovane di qualità",
          "Controlli veterinari costanti",
          "Condizioni di crescita ottimali",
          "Ideale per preparazioni delicate",
        ],
        specs: [
          "Confezione: Cassa da 3 Kg",
          "Tipo: Buratello allevato",
          "Origine: Allevamento UE",
          "Stato: Vivo",
          "Peso medio: 200-400g",
        ],
        whatsappText: "Buratello Vivo Allevato Europa - Cassa da 3Kg - €22,00/Kg",
      },
      6: {
        title: "Anguilla Allevata Europa Sfilettata",
        type: "Pronta per la cottura",
        image: "./images/1000123052 (1).jpg",
        badge: "ALLEVAMENTO",
        badgeClass: "farmed-badge",
        price: "€26,00",
        description:
          "Anguilla da allevamento europeo già sfilettata e pronta all'uso. Lavorazione professionale che garantisce filetti perfetti. Combinazione ideale di qualità controllata e praticità d'uso.",
        features: [
          "Allevamento europeo certificato",
          "Sfilettatura professionale",
          "Filetti perfetti",
          "Qualità controllata",
          "Massima praticità d'uso",
        ],
        specs: [
          "Confezione: Cassa da 3 Kg",
          "Stato: Sfilettata fresca",
          "Origine: Allevamento UE",
          "Lavorazione: Professionale",
          "Conservazione: Refrigerata",
        ],
        whatsappText: "Anguilla Allevata Europa Sfilettata - Cassa da 3Kg - €26,00",
      },
    }
  }

  renderProductNavigation() {
    const nav = document.getElementById("productNav")
    nav.innerHTML = ""

    Object.keys(this.products).forEach((id) => {
      const product = this.products[id]
      const li = document.createElement("li")
      li.innerHTML = `
                <a href="#" data-product-id="${id}">
                    <i class="fas fa-fish"></i>
                    <span>${product.title}</span>
                </a>
            `
      nav.appendChild(li)
    })
  }

  bindEvents() {
    // Product navigation
    document.getElementById("productNav").addEventListener("click", (e) => {
      e.preventDefault()
      const link = e.target.closest("a")
      if (link) {
        const productId = link.dataset.productId
        this.selectProduct(productId)
      }
    })

    // Save buttons
    document.getElementById("saveProductBtn").addEventListener("click", () => {
      this.saveCurrentProduct()
    })

    document.getElementById("saveAllBtn").addEventListener("click", () => {
      this.saveAllProducts()
    })

    // Reset button
    document.getElementById("resetBtn").addEventListener("click", () => {
      this.resetCurrentProduct()
    })

    // Preview button
    document.getElementById("previewBtn").addEventListener("click", () => {
      this.showPreview()
    })

    // Cancel button
    document.getElementById("cancelBtn").addEventListener("click", () => {
      this.cancelEdit()
    })

    // Image upload
    document.getElementById("imageUpload").addEventListener("change", (e) => {
      this.handleImageUpload(e)
    })

    // Image URL input
    document.getElementById("imageUrl").addEventListener("input", (e) => {
      this.updateImagePreview(e.target.value)
    })

    // Dynamic list buttons
    document.getElementById("addFeatureBtn").addEventListener("click", () => {
      this.addFeature()
    })

    document.getElementById("addSpecBtn").addEventListener("click", () => {
      this.addSpec()
    })

    // Modal close
    document.getElementById("closePreview").addEventListener("click", () => {
      this.closePreview()
    })

    // Close modal on outside click
    document.getElementById("previewModal").addEventListener("click", (e) => {
      if (e.target.id === "previewModal") {
        this.closePreview()
      }
    })
  }

  selectProduct(productId) {
    this.currentProductId = productId
    const product = this.products[productId]

    // Update navigation
    document.querySelectorAll(".admin-nav a").forEach((a) => a.classList.remove("active"))
    document.querySelector(`[data-product-id="${productId}"]`).classList.add("active")

    // Show editor
    document.getElementById("welcomeMessage").style.display = "none"
    document.getElementById("productEditor").style.display = "block"

    // Update title
    document.getElementById("currentProductTitle").textContent = `Modifica: ${product.title}`

    // Enable buttons
    document.getElementById("previewBtn").disabled = false
    document.getElementById("resetBtn").disabled = false

    // Populate form
    this.populateForm(product)
  }

  populateForm(product) {
    document.getElementById("productTitle").value = product.title
    document.getElementById("productType").value = product.type
    document.getElementById("productPrice").value = product.price
    document.getElementById("productBadge").value = product.badge
    document.getElementById("productDescription").value = product.description
    document.getElementById("imageUrl").value = product.image

    this.updateImagePreview(product.image)
    this.populateFeatures(product.features)
    this.populateSpecs(product.specs)
  }

  populateFeatures(features) {
    const container = document.getElementById("featuresContainer")
    container.innerHTML = ""

    features.forEach((feature, index) => {
      this.addFeature(feature)
    })
  }

  populateSpecs(specs) {
    const container = document.getElementById("specsContainer")
    container.innerHTML = ""

    specs.forEach((spec, index) => {
      this.addSpec(spec)
    })
  }

  addFeature(value = "") {
    const container = document.getElementById("featuresContainer")
    const div = document.createElement("div")
    div.className = "feature-item"
    div.innerHTML = `
            <input type="text" class="form-input" value="${value}" placeholder="Caratteristica del prodotto">
            <button type="button" class="remove-btn" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `
    container.appendChild(div)
  }

  addSpec(value = "") {
    const container = document.getElementById("specsContainer")
    const div = document.createElement("div")
    div.className = "spec-item"
    div.innerHTML = `
            <input type="text" class="form-input" value="${value}" placeholder="Specifica tecnica">
            <button type="button" class="remove-btn" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `
    container.appendChild(div)
  }

  handleImageUpload(e) {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        document.getElementById("imageUrl").value = imageUrl
        this.updateImagePreview(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  updateImagePreview(url) {
    const img = document.getElementById("currentImage")
    const placeholder = document.getElementById("noImagePlaceholder")

    if (url) {
      img.src = url
      img.style.display = "block"
      placeholder.style.display = "none"
    } else {
      img.style.display = "none"
      placeholder.style.display = "flex"
    }
  }

  saveCurrentProduct() {
    if (!this.currentProductId) return

    const product = this.products[this.currentProductId]

    // Get form data
    product.title = document.getElementById("productTitle").value
    product.type = document.getElementById("productType").value
    product.price = document.getElementById("productPrice").value
    product.badge = document.getElementById("productBadge").value
    product.badgeClass = product.badge === "SELVATICA" ? "wild-badge" : "farmed-badge"
    product.description = document.getElementById("productDescription").value
    product.image = document.getElementById("imageUrl").value

    // Get features
    const featureInputs = document.querySelectorAll("#featuresContainer input")
    product.features = Array.from(featureInputs)
      .map((input) => input.value)
      .filter((v) => v.trim())

    // Get specs
    const specInputs = document.querySelectorAll("#specsContainer input")
    product.specs = Array.from(specInputs)
      .map((input) => input.value)
      .filter((v) => v.trim())

    // Update WhatsApp text
    product.whatsappText = `${product.title} - ${product.type} - ${product.price}`

    // Save to localStorage
    localStorage.setItem("adminProducts", JSON.stringify(this.products))
    localStorage.setItem("lastModified", new Date().toLocaleString("it-IT"))

    // Update navigation
    this.renderProductNavigation()
    document.querySelector(`[data-product-id="${this.currentProductId}"]`).classList.add("active")

    // Update stats
    this.updateStats()

    this.showMessage("Prodotto salvato con successo!", "success")
  }

  saveAllProducts() {
    if (this.currentProductId) {
      this.saveCurrentProduct()
    }

    // Export updated data for main site
    this.exportToMainSite()

    this.showMessage("Tutti i prodotti sono stati salvati!", "success")
  }

  exportToMainSite() {
    // Create updated product data for main site
    const exportData = `
// Updated product data - Generated by Admin Panel
const productData = ${JSON.stringify(this.products, null, 2)};

// Export for use in main site
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productData;
}
        `

    // Save to localStorage for main site to use
    localStorage.setItem("exportedProductData", JSON.stringify(this.products))

    console.log("[v0] Product data exported to localStorage")
  }

  resetCurrentProduct() {
    if (!this.currentProductId) return

    const originalProduct = this.originalProducts[this.currentProductId]
    this.products[this.currentProductId] = JSON.parse(JSON.stringify(originalProduct))

    this.populateForm(this.products[this.currentProductId])
    this.showMessage("Prodotto ripristinato ai valori originali", "success")
  }

  cancelEdit() {
    this.currentProductId = null

    // Hide editor
    document.getElementById("productEditor").style.display = "none"
    document.getElementById("welcomeMessage").style.display = "flex"

    // Update title
    document.getElementById("currentProductTitle").textContent = "Seleziona un prodotto"

    // Disable buttons
    document.getElementById("previewBtn").disabled = true
    document.getElementById("resetBtn").disabled = true

    // Clear navigation selection
    document.querySelectorAll(".admin-nav a").forEach((a) => a.classList.remove("active"))
  }

  showPreview() {
    if (!this.currentProductId) return

    const product = this.getCurrentFormData()
    const modal = document.getElementById("previewModal")
    const content = document.getElementById("previewContent")

    content.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
            </div>
            <div class="product-info" style="padding: 1rem 0;">
                <div class="${product.badgeClass}" style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; font-weight: 600; margin-bottom: 0.5rem; ${product.badge === "SELVATICA" ? "background: #10b981; color: white;" : "background: #f59e0b; color: white;"}">${product.badge}</div>
                <h3 style="margin: 0.5rem 0; color: #1e293b;">${product.title}</h3>
                <p style="color: #64748b; margin: 0.25rem 0;">${product.type}</p>
                <p style="margin: 1rem 0; color: #374151;">${product.description}</p>
                <div style="font-size: 1.25rem; font-weight: 600; color: #059669;">${product.price}</div>
            </div>
        `

    modal.classList.add("show")
  }

  closePreview() {
    document.getElementById("previewModal").classList.remove("show")
  }

  getCurrentFormData() {
    return {
      title: document.getElementById("productTitle").value,
      type: document.getElementById("productType").value,
      price: document.getElementById("productPrice").value,
      badge: document.getElementById("productBadge").value,
      badgeClass: document.getElementById("productBadge").value === "SELVATICA" ? "wild-badge" : "farmed-badge",
      description: document.getElementById("productDescription").value,
      image: document.getElementById("imageUrl").value,
    }
  }

  updateStats() {
    document.getElementById("totalProducts").textContent = Object.keys(this.products).length
    const lastModified = localStorage.getItem("lastModified")
    document.getElementById("lastModified").textContent = lastModified || "--"
  }

  showMessage(text, type = "success") {
    const container = document.getElementById("messageContainer")
    const message = document.createElement("div")
    message.className = `message ${type}`
    message.innerHTML = `
            <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
            <span>${text}</span>
        `

    container.appendChild(message)

    setTimeout(() => {
      message.remove()
    }, 3000)
  }
}

// Initialize admin panel
document.addEventListener("DOMContentLoaded", () => {
  new AdminPanel()
})
