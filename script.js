const PHONE = "251931838883";
const products = [
  {n:"Samsung Galaxy A-series", c:"Phones", t:"New, sealed", p:"Call for price", s:"In stock"},
  {n:"Tecno Spark / Camon", c:"Phones", t:"New, sealed", p:"Call for price", s:"In stock"},
  {n:"Infinix Hot / Note", c:"Phones", t:"New, sealed", p:"Call for price", s:"In stock"},
  {n:"iPhone (used, tested)", c:"Phones", t:"Used, 1 month warranty", p:"Call for price", s:"Limited"},
  {n:"Fast charger + cable", c:"Accessories", t:"Type-C / iPhone", p:"Call for price", s:"In stock"},
  {n:"Earphones and Bluetooth buds", c:"Accessories", t:"Wired and wireless", p:"Call for price", s:"In stock"},
  {n:"Power bank 10,000 mAh", c:"Accessories", t:"Dual USB", p:"Call for price", s:"In stock"},
  {n:"Case + screen protector", c:"Accessories", t:"Fits most models", p:"Call for price", s:"In stock"},
  {n:"Screen replacement", c:"Repairs", t:"Same-day for common models", p:"Call for quote", s:"Walk-in"},
  {n:"Battery replacement", c:"Repairs", t:"Tested before you leave", p:"Call for quote", s:"Walk-in"}
];
const cats = ["All", ...new Set(products.map(p => p.c))];
const filters = document.getElementById("filters");
const grid = document.getElementById("grid");
let active = "All";

function esc(s){return s.replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}

function render(){
  filters.innerHTML = cats.map(c =>
    `<button class="chip" aria-pressed="${c===active}" data-c="${c}">${c}</button>`).join("");
  grid.innerHTML = products.filter(p => active==="All" || p.c===active).map(p => `
    <article class="item">
      <span class="tag">${esc(p.c)}</span>
      <h3>${esc(p.n)}</h3>
      <span>${esc(p.t)}</span>
      <span class="stock">${esc(p.s)}</span>
      <span class="price">${esc(p.p)}</span>
      <a class="ask" href="tel:+${PHONE}">Ask about this</a>
    </article>`).join("");
}
filters.addEventListener("click", e => {
  const b = e.target.closest("button[data-c]");
  if(b){ active = b.dataset.c; render(); }
});
render();

/* contact form: opens WhatsApp with the message prefilled */
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const tel = document.getElementById("tel").value.trim();
  const need = document.getElementById("need").value;
  const text = document.getElementById("text").value.trim();
  const msg = document.getElementById("msg");
  if(name.length < 2 || tel.replace(/\D/g,"").length < 9){
    msg.className = "msg err";
    msg.textContent = "Enter your name and a phone number with at least 9 digits.";
    return;
  }
  const body = `Hello Mobile Shop Center. I am ${name} (${tel}). I need: ${need}. ${text}`;
  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
  msg.className = "msg";
  msg.textContent = "Opening WhatsApp so you can send your message.";
  e.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
