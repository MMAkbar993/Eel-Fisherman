// GDPR Cookie Management
class GDPRManager {
  constructor() {
    this.cookieConsent = null
    this.thirdPartyCookiesAllowed = false
    this.init()
  }

  init() {
    // Check if user has already made a choice
    this.cookieConsent = localStorage.getItem("cookieConsent")
    this.thirdPartyCookiesAllowed = localStorage.getItem("thirdPartyCookies") === "true"

    if (!this.cookieConsent) {
      this.showCookieBanner()
    }

    this.bindEvents()
  }

  showCookieBanner() {
    const banner = document.getElementById("cookieConsent")
    setTimeout(() => {
      banner.classList.add("show")
    }, 1000)
  }

  hideCookieBanner() {
    const banner = document.getElementById("cookieConsent")
    banner.classList.remove("show")
  }

  acceptAllCookies() {
    localStorage.setItem("cookieConsent", "all")
    localStorage.setItem("thirdPartyCookies", "true")
    this.thirdPartyCookiesAllowed = true
    this.hideCookieBanner()
    this.loadThirdPartyServices()
  }

  acceptNecessaryOnly() {
    localStorage.setItem("cookieConsent", "necessary")
    localStorage.setItem("thirdPartyCookies", "false")
    this.thirdPartyCookiesAllowed = false
    this.hideCookieBanner()
  }

  loadThirdPartyServices() {
    if (this.thirdPartyCookiesAllowed) {
      // Load third-party services here if needed
      console.log("[v0] Third-party cookies enabled - services can be loaded")
    }
  }

  bindEvents() {
    document.getElementById("acceptAll")?.addEventListener("click", () => {
      this.acceptAllCookies()
    })

    document.getElementById("acceptNecessary")?.addEventListener("click", () => {
      this.acceptNecessaryOnly()
    })

    document.getElementById("cookieSettings")?.addEventListener("click", () => {
      this.showCookieModal()
    })

    document.getElementById("closeModal")?.addEventListener("click", () => {
      this.hideCookieModal()
    })

    document.getElementById("saveSettings")?.addEventListener("click", () => {
      this.saveCustomSettings()
    })
  }

  showCookieModal() {
    const modal = document.getElementById("cookieModal")
    const thirdPartyCheckbox = document.getElementById("thirdPartyCookies")

    // Set current state
    thirdPartyCheckbox.checked = this.thirdPartyCookiesAllowed

    modal.classList.add("show")
  }

  hideCookieModal() {
    const modal = document.getElementById("cookieModal")
    modal.classList.remove("show")
  }

  saveCustomSettings() {
    const thirdPartyEnabled = document.getElementById("thirdPartyCookies").checked

    localStorage.setItem("cookieConsent", "custom")
    localStorage.setItem("thirdPartyCookies", thirdPartyEnabled.toString())
    this.thirdPartyCookiesAllowed = thirdPartyEnabled

    this.hideCookieModal()
    this.hideCookieBanner()

    if (thirdPartyEnabled) {
      this.loadThirdPartyServices()
    }
  }
}

// Initialize GDPR Manager
const gdprManager = new GDPRManager()

function sendWhatsApp(productInfo) {
  // Check if third-party cookies are allowed
  if (!gdprManager.thirdPartyCookiesAllowed) {
    if (!confirm("Per utilizzare WhatsApp è necessario accettare i cookie di terze parti. Vuoi procedere?")) {
      return
    }
    // Update consent
    gdprManager.acceptAllCookies()
  }

  const phoneNumber = "393284506645"
  const gdprNotice =
    "\n\n📋 Informativa Privacy: Contattandoci tramite WhatsApp, accetti il trattamento dei tuoi dati secondo la nostra informativa privacy disponibile sul sito web."
  const message = `Ciao Marco, sono interessato a:\n\n${productInfo}\n\nPotresti darmi maggiori informazioni su disponibilità e consegna?\n\nGrazie!${gdprNotice}`
  const encodedMessage = encodeURIComponent(message)

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
  window.open(whatsappUrl, "_blank")
}

// Smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    })
  })
})

// Add loading animation to WhatsApp buttons
document.querySelectorAll(".whatsapp-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const originalText = this.innerHTML
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Apertura WhatsApp...'
    setTimeout(() => {
      this.innerHTML = originalText
    }, 2000)
  })
})

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
  }
})

function showPrivacyPolicy() {
  const modal = document.getElementById("privacyModal")
  modal.classList.add("show")
}

function closePrivacyModal() {
  const modal = document.getElementById("privacyModal")
  modal.classList.remove("show")
}

function showDataRights() {
  const modal = document.getElementById("dataRightsModal")
  modal.classList.add("show")
}

function closeDataRightsModal() {
  const modal = document.getElementById("dataRightsModal")
  modal.classList.remove("show")
}

function showCookieSettings() {
  gdprManager.showCookieModal()
}

// Close modals when clicking outside
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("privacy-modal") || e.target.classList.contains("cookie-modal")) {
    e.target.classList.remove("show")
  }
})

const productData = {
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

function openProductDetail(productId) {
  const product = productData[productId]
  if (!product) return

  // Populate modal with product data
  document.getElementById("detailImage").src = product.image
  document.getElementById("detailImage").alt = product.title
  document.getElementById("detailBadge").textContent = product.badge
  document.getElementById("detailBadge").className = `product-badge ${product.badgeClass}`
  document.getElementById("detailTitle").textContent = product.title
  document.getElementById("detailType").textContent = product.type
  document.getElementById("detailDescription").textContent = product.description
  document.getElementById("detailPrice").textContent = product.price

  // Populate features
  const featuresContainer = document.getElementById("detailFeatures")
  featuresContainer.innerHTML = product.features
    .map((feature) => `<div class="feature-item"><i class="fas fa-check"></i> ${feature}</div>`)
    .join("")

  // Populate specs
  const specsContainer = document.getElementById("detailSpecs")
  specsContainer.innerHTML = product.specs
    .map((spec) => `<div class="spec-item"><i class="fas fa-info"></i> ${spec}</div>`)
    .join("")

  // Set WhatsApp button action
  const whatsappBtn = document.getElementById("detailWhatsAppBtn")
  whatsappBtn.onclick = () => sendWhatsApp(product.whatsappText)

  // Show modal
  document.getElementById("productDetailModal").classList.add("show")
  document.body.style.overflow = "hidden" // Prevent background scrolling
}

function closeProductDetail() {
  document.getElementById("productDetailModal").classList.remove("show")
  document.body.style.overflow = "auto" // Restore scrolling
}

document.getElementById("closeProductDetail").addEventListener("click", closeProductDetail)

// Close modal when clicking outside
document.getElementById("productDetailModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeProductDetail()
  }
})

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProductDetail()
  }
})
