/* ElectroPro — funcionalidades del sitio */

// ===== CONFIGURACIÓN: editá solo esta parte =====
// Número de WhatsApp con código de país, sin + ni espacios (ej.: 5492235123456)
const WHATSAPP = "549223XXXXXXX";

const MENSAJE_BASE = "Hola ElectroPro, quiero consultar por un trabajo.";

// Fotos de la galería. Guardalas en la carpeta /img (WebP, ~1200 px de ancho).
// Si "src" queda vacío, se muestra un recuadro gris de reserva.
const TRABAJOS = [
  { src: "", alt: "Tablero eléctrico instalado", titulo: "Tablero eléctrico" },
  { src: "", alt: "Instalación de cámaras de seguridad", titulo: "Cámaras de seguridad" },
  { src: "", alt: "Instalación eléctrica en vivienda", titulo: "Instalación en vivienda" },
  { src: "", alt: "Canalización y cableado", titulo: "Canalización y cableado" },
];
// ================================================

const urlWhatsApp = (texto) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

// Todos los enlaces con data-whatsapp abren el chat con el mensaje base
document.querySelectorAll("[data-whatsapp]").forEach((a) => {
  a.href = urlWhatsApp(MENSAJE_BASE);
  a.target = "_blank";
  a.rel = "noopener";
});

// Galería: se arma desde la lista TRABAJOS
const galeria = document.getElementById("galeria");
TRABAJOS.forEach((t) => {
  const fig = document.createElement("figure");
  if (t.src) {
    const img = document.createElement("img");
    img.src = t.src;
    img.alt = t.alt;
    img.loading = "lazy";
    img.width = 1200;
    img.height = 900;
    fig.appendChild(img);
  } else {
    const vacio = document.createElement("div");
    vacio.className = "vacio";
    vacio.textContent = "Foto próximamente";
    fig.appendChild(vacio);
  }
  const cap = document.createElement("figcaption");
  cap.textContent = t.titulo;
  fig.appendChild(cap);
  galeria.appendChild(fig);
});

// Formulario: valida y abre WhatsApp con el mensaje armado
const form = document.getElementById("form-presupuesto");
const error = document.getElementById("form-error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const nombre = (d.get("nombre") || "").trim();
  const tipo = d.get("tipo");

  if (!nombre || !tipo) {
    error.hidden = false;
    return;
  }
  error.hidden = true;

  const zona = (d.get("zona") || "").trim();
  const detalle = (d.get("detalle") || "").trim();
  const lineas = [
    "Hola ElectroPro, quiero pedir un presupuesto.",
    `Nombre: ${nombre}`,
    `Trabajo: ${tipo}`,
  ];
  if (zona) lineas.push(`Zona: ${zona}`);
  if (detalle) lineas.push(`Detalle: ${detalle}`);

  window.open(urlWhatsApp(lineas.join("\n")), "_blank", "noopener");
});
