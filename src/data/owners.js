// Owners page content (CMS-shaped). Copy is verbatim from the "Owners" design.
// Each section is a list of blocks, so the CMS can reorder or add content without new components:
//   text (\n = line break) · title (30px heading) · subtitle · heading (25px) · feature (22px title + text)
//   list (columns: 2 = two-column list) · media (image beside more blocks)
export const owners = {
  banner: {
    title: "Owners",
    media: { url: "/images/owners/banner.jpg", alternativeText: "" },
    position: "50% 100%",
  },
  breadcrumb: [
    { id: "home", label: "Home", href: "/" },
    { id: "owners", label: "Owners" },
  ],
  navLabel: "Owner services",
  sections: [
    {
      id: "aftersales",
      label: "Aftersales and Service",
      title: "Aftersales and Service",
      // Shown above the section title
      image: {
        src: "/images/owners/aftersales.jpg",
        alt: "A Lincoln grille being polished by hand",
        ratio: "1166/440",
      },
      blocks: [
        {
          type: "text",
          text: "Arabian Car Marketing thank you for selecting one of our quality products. Our commitment to you and your vehicle begins with quality protection and service.",
        },
      ],
    },
    {
      id: "service-center",
      label: "Our Service Center",
      title: "Our Service Center",
      blocks: [
        {
          type: "text",
          text: "At Arabian Car Marketing we are committed to investing as much care into servicing and repairing your vehicle as Lincoln do into building it.\nOur highly skilled Lincoln-trained technicians will use Lincoln-specific tools and the latest computerized diagnostic equipment designed specifically for your Lincoln. We guarantee to use only original Lincoln parts, engineered to fit and perform perfectly with your vehicle.",
        },
        { type: "title", text: "Know When Your Warranty Begins" },
        {
          type: "text",
          text: "Your Warranty Start Date is the day you take delivery of your new vehicle or the day it is first put into service. If you bought a previously owned vehicle, you are eligible for any remaining warranty coverages.",
        },
        { type: "title", text: "Warranty Coverage – Differ by Market" },
        {
          type: "text",
          text: "Lincoln Motor Company provides a 3-year or 60,000kms, whichever comes first, Bumper-to-Bumper coverage and 5-year Power-train warranty on all NA sourced vehicle. However, in some markets (UAE, Kuwait, Qatar, Bahrain) and select model year, a 5-year/100,000 kms Limited Warranty is offered.",
        },
      ],
    },
    {
      id: "parts",
      label: "Parts",
      title: "Genuine Lincoln Parts",
      blocks: [
        { type: "subtitle", text: "Precision for every journey." },
        {
          type: "text",
          text: "Maintain the performance, comfort, and refinement of your Lincoln with genuine parts designed for your vehicle. From routine replacements to essential components, our team can help you find the right part for your model.",
        },
        {
          type: "feature",
          title: "Designed for Your Lincoln",
          text: "Choose parts engineered to fit and work seamlessly with your vehicle.",
        },
        {
          type: "feature",
          title: "Quality You Can Rely On",
          text: "Preserve your Lincoln’s original standards with genuine replacement components.",
        },
        {
          type: "feature",
          title: "Expert Assistance",
          text: "Contact our parts team for guidance on compatibility, availability, and ordering.",
        },
      ],
    },
    {
      id: "maintenance",
      label: "Vehicle Maintenance",
      title: "Vehicle Maintenance",
      blocks: [
        { type: "heading", text: "Maintain Your Vehicle Properly" },
        {
          type: "text",
          text: "Your Owner Guide indicates the scheduled maintenance required for your vehicle. Proper maintenance guards against major repair expenses resulting from neglect or inadequate maintenance and help increase the value you receive when you sell or trade your vehicle.",
        },
        {
          type: "text",
          text: "It is your responsibility to make sure that all of the scheduled maintenance is performed and that the materials used meet Lincoln engineering specifications. Failure to perform scheduled maintenance as specified in the Owner Guide will invalidate warranty coverage on parts affected by the lack of maintenance.",
        },
        {
          type: "text",
          text: "At Arabian Car Marketing our Service Center has factory-trained technicians who can perform the required maintenance using genuine Lincoln parts. Our dealership looks forward to meeting your every service need to maximize your satisfaction with your vehicle.",
        },
        { type: "heading", text: "Maintenance/wear" },
        {
          type: "text",
          text: "The New Vehicle Limited Warranty does not cover: (1) parts and labor needed to maintain the vehicle; and (2) the replacement of parts due to normal wear and tear. As the owner, you are responsible for these items.",
        },
        {
          type: "media",
          image: {
            src: "/images/owners/maintenance.jpg",
            alt: "A Lincoln SUV raised on a service lift in the workshop",
            ratio: "455/275",
          },
          blocks: [
            {
              type: "heading",
              text: "Some examples of maintenance and normal wear are:",
            },
            {
              type: "list",
              columns: 2,
              items: [
                "Oil changes",
                "Manual clutch components",
                "Oils, lubricants, other fluids",
                "Wiper blades",
                "Oil/air filters",
                "Wheel alignments and tire balancing",
                "Tire rotation",
                "Brake pad/lining and rotor/drum",
                "Cleaning/polishing",
                "Light bulbs",
                "Batteries",
                "Belts",
                "Paint corrosion",
                "Trim appearance",
                "Shock absorbers/struts",
                "Suspension joints and bushings",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "protect",
      label: "Lincoln Protect",
      title: "Lincoln Protect",
      blocks: [
        {
          type: "text",
          text: "Unexpected repairs can be costly – protect yourself, your vehicle and your budget.",
        },
        { type: "heading", text: "ESP PremiumCARE" },
        {
          type: "text",
          text: "Factory-like coverage provided by Lincoln Motor Company and the only program backed by Lincoln. Enjoy your vehicle worry-free, long after your new vehicle limited warranty expires.",
        },
        {
          type: "list",
          items: [
            "With more than 1,000 components covered, you’re protected for covered repairs down the road",
            "Customize a plan that’s right for you with coverage terms up to 8 years or up to 300,000 km, depending on the plan you select",
            "ESP PremiumCARE offers multiple coverage duration and kilometer options",
          ],
        },
        {
          type: "media",
          image: {
            src: "/images/owners/premium-maintenance.jpg",
            alt: "A Lincoln technician working under an open bonnet",
            ratio: "455/363",
            position: "50% 6%",
          },
          blocks: [
            { type: "heading", text: "Premium Maintenance" },
            {
              type: "text",
              text: "Premium Maintenance from Lincoln Protect covers routine inspections, preventive care and replacement of normal “wear and tear” items that require periodic attention, including:",
            },
            {
              type: "list",
              items: [
                "Engine Oil & Filter Changes",
                "Multi-point Inspections",
                "Replace Shock Absorbers",
                "Tire Rotations",
                "Clutch Discs",
                "Spark Plugs",
                "Engine Belts, Hoses, Hose Clamps",
                "Wiper Blades",
              ],
            },
            {
              type: "text",
              text: "Lincoln Protect Plans are honored by all authorized Lincoln dealers in the Middle East. That means you get reliable, quality service at any Lincoln dealership",
            },
          ],
        },
        { type: "heading", text: "Transferable Coverage" },
        {
          type: "text",
          text: "If you sell your vehicle before your Lincoln Protect Plan coverage expires, you can transfer any remaining coverage to the new owner. Whenever you sell your vehicle, prospective buyers may have a higher degree of confidence that vehicle was properly maintained with Lincoln Protect, thereby improving resale value.\nContact us today and find out how to register for peace of mind protection for your vehicle!",
        },
      ],
    },
    {
      id: "quick-lane",
      label: "Quick Lane",
      title: "Quick Lane",
      blocks: [
        {
          type: "list",
          items: [
            "Designed to provide quality repairs and convenient maintenance service for not only Lincoln vehicles, but for all cars, trucks, and SUVs, regardless of the make or model.",
            "Offers time-sensitive customers the convenience of quick, while-you-wait service at competitive prices. Services include maintenance, oil & filter, tires, brakes, alignment, and suspension.",
            "Caters to customers' desire for value, convenience and superior treatment - all delivered in a trusted setting by dedicated staff",
          ],
        },
      ],
    },
    {
      id: "road-assist",
      label: "Lincoln Road Assist (RSA)",
      title: "Lincoln Road Assist (RSA)",
      blocks: [
        {
          type: "text",
          text: "Being on the road is a wonderful feeling. Being stuck on the side? Not as much. But with Lincoln Road Assist, one call and we’ll send someone out to give you the help you need.\nLincoln Road Assist provides complimentary roadside assistance for Lincoln retail customers in Saudi Arabia, Kuwait, UAE, Bahrain, Oman, Qatar, Lebanon and Jordan.",
        },
      ],
    },
  ],
  // No form backend exists yet: `action` is a placeholder until the client confirms where enquiries go.
  enquiry: {
    title: "How may I help you?",
    image: {
      src: "/images/owners/enquiry.jpg",
      alt: "A Lincoln Navigator driving along a forest road",
    },
    action: "#",
    fields: [
      { name: "name", label: "Name", type: "text", autoComplete: "name" },
      { name: "email", label: "Email", type: "email", autoComplete: "email" },
      { name: "subject", label: "Subject", type: "text" },
    ],
    message: { name: "message", label: "Message" },
    submit: "Submit",
  },
};
