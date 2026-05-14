// EduNexus — Save Registrations to Supabase
// Add to index.html before </body>:
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
//   <script src="save-registration.js"></script>

const SUPABASE_URL = "https://ewlxdonmjqhvimfbzmlq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bHhkb25tanFodmltZmJ6bWxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3NTcyMDMsImV4cCI6MjA5NDMzMzIwM30.tzfSYGtMhh_b9tSW-rV0zmG4hDJma5rvB6chWIrLEsA";

const { createClient } = window.supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", () => {

  const submitBtn = [...document.querySelectorAll("button")]
    .find(b => b.textContent.includes("Early Access") || b.textContent.includes("Request"));

  if (!submitBtn) return;

  submitBtn.addEventListener("click", async () => {

    const role     = document.querySelector('.role-btn.active, .tab-btn.active, [class*="active"]')
                      ?.textContent?.toLowerCase().includes("teach") ? "tutor" : "student";
    const fullName = document.querySelector('input[placeholder*="name" i]')?.value?.trim();
    const regNo    = document.querySelector('input[placeholder*="123"], input[placeholder*="Reg" i]')?.value?.trim();
    const email    = document.querySelector('input[type="email"]')?.value?.trim();
    const course   = document.querySelectorAll('select')[0]?.value;
    const subject  = document.querySelectorAll('select')[1]?.value;
    const cgpa     = document.querySelector('input[placeholder*="CGPA" i], input[placeholder*="cgpa"]')?.value?.trim();
    const whatsapp = document.querySelector('input[type="tel"], input[placeholder*="WhatsApp" i]')?.value?.trim();

    // Only save if minimum fields are filled
    if (!email || !fullName) return;

    const { error } = await db.from("registrations").insert({
      full_name: fullName,
      reg_no:    regNo    || null,
      email,
      role,
      course:    course   || null,
      subject:   subject  || null,
      cgpa:      cgpa     || null,
      whatsapp:  whatsapp || null,
    });

    if (error) console.error("EduNexus DB:", error.message);
    else console.log("Registration saved ✅");
  });

});
