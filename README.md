# Learning Roots Royal Academy: website

Static HTML, CSS and JavaScript. No build step.

## Deploy
1. Replace the contents of your GitHub repository with the files in this folder (keep the `.git` folder), commit and push to `main`.
2. Netlify rebuilds automatically.

## Netlify setup (do once, in this order)
1. **Forms > Form detection** must be enabled. After the first deploy, the forms contact, careers, scholarship, fee-request, enquiry, alumni, counselling-request and management-contact appear under Forms.
2. **Forms > Notifications > Add notification > Email notification**: add `contact@learningrootsroyalacademy.com` for every form (select each form, or "Any form"). For `counselling-request` use the counsellor's email, and for `management-contact` use the management email, so those messages reach the right people.
3. **Forms > Spam filtering**: leave Akismet and reCAPTCHA on. Each form already has a honeypot and Netlify reCAPTCHA.
4. **Domain management**: confirm HTTPS (Let's Encrypt) is active and "Force HTTPS" is on.
5. **Security headers**: the site sends a Content-Security-Policy in *report-only* mode. After you have tested every form and the map, rename `Content-Security-Policy-Report-Only` to `Content-Security-Policy` in `netlify.toml`.
6. Old links (`/nursery`, `/early-years`, `/creche`, `/classes`, `/primary`) are redirected automatically.

## Updating content
- Page text lives in the `.html` files. The chat assistant and the FAQ page read answers from `assets/faq-data.js`.
- Calendar weeks are in `calendar.html`; each week has `data-start` and `data-end` dates used to highlight the current week.
- News items on `news.html` show Completed, Happening now or Upcoming automatically from their `data-start` and `data-end` dates.
- To add the school GPS pin, replace the `src` of the map in `contact.html` with the Google Maps embed link for the exact coordinates.
- To add Google reCAPTCHA to the WhatsApp check later, add your site key and a verification function. The simple tick-box lives in `assets/site.js`.
- After each change, update `VERSION` in `sw.js` so returning visitors get the new files.
