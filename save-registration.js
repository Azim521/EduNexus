// ─────────────────────────────────────────────────────────────
//  EduNexus — Save Registrations to Supabase
//  Add to index.html AFTER the existing <script src="script.js">
//
//  Replace the two values below with your Supabase credentials:
//  Supabase Dashboard → Project Settings → API
// ─────────────────────────────────────────────────────────────

const SUPABASE_URL  = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_KEY  = "YOUR_ANON_PUBLIC_KEY";

const { createClient } = window.supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// Wait for page to load
document.addEventListener("DOMContentLoaded", () => {

  // Find the submit button — adjust selector if needed
  const submitBtn = document.querySelector('button[type="submit"], .register-btn, input[type="submit"]')
    || [...document.querySelectorAll("button")].find(b => b.textContent.includes("Early Access"));

  if (!submitBtn) return console.warn("EduNexus: submit button not found");

  submitBtn.addEventListener("click", async (e) => {

    // Read all form fields
    const role     = document.querySelector('.role-btn.active, .tab-btn.active')?.textContent?.toLowerCase().includes("teach") ? "tutor" : "student";
    const fullName = document.querySelector('input[placeholder*="name" i], input[placeholder*="Full"]')?.value?.trim();
    const regNo    = document.querySelector('input[placeholder*="123"], input[placeholder*="Reg"]')?.value?.trim();
    const email    = document.querySelector('input[type="email"]')?.value?.trim();
    const course   = document.querySelector('select')?.value;
    const subject  = document.querySelectorAll('select')[1]?.value;
    const cgpa     = document.querySelector('input[placeholder*="CGPA"], input[placeholder*="cgpa"]')?.value?.trim();
    const whatsapp = document.querySelector('input[type="tel"], input[placeholder*="WhatsApp"]')?.value?.trim();

    // Basic validation — only save if email is filled
    if (!email || !fullName) return;

    // Save to Supabase (fire and forget — don't block existing flow)
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

    if (error) {
      console.error("EduNexus DB error:", error.message);
    } else {
      console.log("EduNexus: registration saved ✅");
    }
  });

});
