export type SimpleItem = { label: string; href: string };
export type Region = { name: string; href: string; locations: SimpleItem[] };

export type NavData = {
  supportPhone: string;
  logoSrc: string;
  items: Array<
    | { type: "link"; label: string; href: string }
    | { type: "dropdown"; label: string; items: SimpleItem[] }
    | { type: "locations"; label: string; regions: Region[]; allHref: string }
  >;
};

export const NAV: NavData = {
  supportPhone: "07951431111",
  logoSrc: "/yma-logo.png",
  items: [
    { type: "link", label: "HOME", href: "/" },
    { type: "link", label: "BOOKING CATALOG", href: "/catalog" },
    {
      type: "dropdown",
      label: "ABOUT",
      items: [
        { label: "About Us", href: "/about" },
        { label: "FAQs", href: "/faq" },
      ],
    },
    {
      type: "locations",
      label: "OUR LOCATIONS",
      allHref: "/our-locations",
      regions: [
        {
          name: "London",
          href: "/bouncy-castles-hire-in-london",
          locations: [
            {
              label: "Walthamstow",
              href: "/bouncy-castles-hire-in-walthamstow",
            },
            {
              label: "Palmers Green N13",
              href: "/bouncy-castles-hire-in-palmers-green-n13",
            },
            { label: "Barnet", href: "/bouncy-castles-hire-in-barnet-en4en5" },
            {
              label: "Tottenham N17",
              href: "/bouncy-castles-hire-in-tottenham-n17",
            },
          ],
        },
        {
          name: "EAST LONDON",
          href: "/bouncy-castles-hire-in-east-london",
          locations: [
            { label: "Dagenham", href: "/bouncy-castles-hire-in-dagenham" },
            { label: "Stratford", href: "/bouncy-castles-hire-in-stratford" },
            { label: "Becton", href: "/bouncy-castles-hire-in-becton" },
            {
              label: "Whitechapel",
              href: "/bouncy-castles-hire-in-whitechapel",
            },
            {
              label: "Custom House E16",
              href: "/bouncy-castles-hire-in-custom-house-e16",
            },
            {
              label: "Stepney Green E1",
              href: "/bouncy-castles-hire-in-stepney-green-e1",
            },
            { label: "Wapping", href: "/bouncy-castles-hire-in-wapping" },
            { label: "Shadwell", href: "/bouncy-castles-hire-in-shadwell" },
            { label: "Mile End", href: "/bouncy-castles-hire-in-mile-end" },
            {
              label: "Victoria Park",
              href: "/bouncy-castles-hire-in-victoria-park",
            },
            {
              label: "Hackney Wick",
              href: "/bouncy-castles-hire-in-hackney-wick",
            },
            { label: "Homerton", href: "/bouncy-castles-hire-in-homerton" },
          ],
        },
        {
          name: "NORTH LONDON",
          href: "/bouncy-castles-hire-in-north-london",
          locations: [
            {
              label: "Muswell Hill",
              href: "/bouncy-castles-hire-in-muswell-hill",
            },
            {
              label: "Winchmore Hill",
              href: "/bouncy-castles-hire-in-winchmore-hill",
            },
            {
              label: "Palmers Green",
              href: "/bouncy-castles-hire-in-palmers-green",
            },
            { label: "Southgate", href: "/bouncy-castles-hire-in-southgate" },
            { label: "Chingford", href: "/bouncy-castles-hire-in-chingford" },
            { label: "Edmonton", href: "/bouncy-castles-hire-in-edmonton" },
          ],
        },
        {
          name: "ESSEX",
          href: "/bouncy-castles-hire-in-essex",
          locations: [
            { label: "Loughton", href: "/bouncy-castles-hire-in-loughton" },
            { label: "Chigwell", href: "/bouncy-castles-hire-in-chigwell" },
            {
              label: "Buckhurst Hill",
              href: "/bouncy-castles-hire-in-buckhurst-hill",
            },
            { label: "Ilford", href: "/bouncy-castles-hire-in-ilford" },
            { label: "Woodford", href: "/bouncy-castles-hire-in-woodford" },
            { label: "Wanstead", href: "/bouncy-castles-hire-in-wanstead" },
            { label: "Leyton", href: "/bouncy-castles-hire-in-leyton" },
            {
              label: "Barkingside",
              href: "/bouncy-castles-hire-in-barkingside",
            },
            { label: "Hainault", href: "/bouncy-castles-hire-in-hainault" },
            { label: "Fairlop", href: "/bouncy-castles-hire-in-fairlop" },
          ],
        },
        {
          name: "ENFIELD",
          href: "/bouncy-castles-hire-in-enfield",
          locations: [
            {
              label: "Waltham Abbey",
              href: "/bouncy-castles-hire-in-waltham-abbey-en9",
            },
          ],
        },
      ],
    },
    { type: "link", label: "NEWS", href: "/news" },
    { type: "link", label: "CONTACT", href: "/contact" },
  ],
};
