// Legal pages (CMS-shaped). `body` is rich-text HTML from the backend editor — styled by the `typography` utility.
const banner = {
  banner: "/images/owners/banner.jpg",
  banner_alt_text: "",
  position: "50% 100%",
};

const crumbs = (id, label) => [
  { id: "home", label: "Home", href: "/" },
  { id: id, label },
];

export const terms = {
  banner: { banner_title: "Terms & Conditions", ...banner },
  breadcrumb: crumbs("terms", "Terms & Conditions"),
  updated: "Last updated: 1 January 2026",
  body: `
<h2>1. Acceptance of terms</h2>
<p>By accessing or using this website you agree to be bound by these <strong>Terms &amp; Conditions</strong>. If you do not agree, please do not use the site.</p>
<h2>2. Use of the website</h2>
<p>You may use this website for lawful purposes only. You agree not to:</p>
<ul>
  <li>Use the site in any way that breaches applicable laws or regulations.</li>
  <li>Attempt to gain unauthorised access to any part of the site.
    <ul>
      <li>Including servers, databases or connected systems.</li>
    </ul>
  </li>
  <li>Introduce viruses or other harmful material.</li>
</ul>
<h3>2.1 Accounts and enquiries</h3>
<p>Information you submit through our forms must be accurate and complete. We may contact you using the details provided.</p>
<h2>3. Vehicle information and offers</h2>
<ol>
  <li>Specifications, images and prices are indicative and may change without notice.</li>
  <li>Offers are subject to availability and the terms published with each offer.</li>
  <li>Please confirm details with an authorised Lincoln showroom before purchase.</li>
</ol>
<h2>4. Intellectual property</h2>
<p>All content, trademarks and logos are owned by or licensed to Arabian Car Marketing Co. LLC and Ford Motor Company. You may not reproduce them without written permission.</p>
<h2>5. Contact us</h2>
<p>Questions about these terms? Email <a href="mailto:lincolnacm@omantel.net.om">lincolnacm@omantel.net.om</a> or visit our <a href="/contact-us">contact page</a>.</p>
`,
};

export const privacy = {
  banner: { banner_title: "Privacy Policy", ...banner },
  breadcrumb: crumbs("privacy", "Privacy Policy"),
  updated: "Last updated: 1 January 2026",
  body: `
<h2>1. Introduction</h2>
<p>Arabian Car Marketing Co. LLC respects your privacy. This policy explains how we collect, use and protect your <strong>personal information</strong>.</p>
<h2>2. Information we collect</h2>
<ul>
  <li>Contact details such as name, email address and phone number.</li>
  <li>Enquiry details, including vehicle interest and preferred showroom.</li>
  <li>Technical data such as browser type and pages visited.</li>
</ul>
<h2>3. How we use your information</h2>
<ol>
  <li>To respond to quotes, test-drive bookings and enquiries.</li>
  <li>To improve our website and services.</li>
  <li>To send marketing messages, only where you have agreed.</li>
</ol>
<h3>3.1 Sharing</h3>
<p>We share data only with authorised partners who help us serve you, and where required by law. We never sell your data.</p>
<h2>4. Cookies</h2>
<p>We use cookies to keep the site working and to understand usage. You can disable them in your browser settings.</p>
<h2>5. Your rights</h2>
<p>You may request access to, correction of, or deletion of your personal data at any time.</p>
<h2>6. Contact us</h2>
<p>Write to <a href="mailto:lincolnacm@omantel.net.om">lincolnacm@omantel.net.om</a> or call <a href="tel:92880658">92880658</a>.</p>
`,
};
