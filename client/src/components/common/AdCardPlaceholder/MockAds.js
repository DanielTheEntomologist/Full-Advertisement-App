// ad object in mongodb
// _id : 66aa7bdb746ec548544ffbec
// title: "Test Advert 1"
// content: "Test Content Dorem solorem ipsum"
// date: 2022-09-14T22:00:00.000+00:00
// image: "public\avatars\image-1722448859206-995222211.jpg"
// price: 10000
// location: "Moon City 11"
// seller: "66aa543507690f436c77cb46"
// __v: 0

const ads = [
  {
    id: 1,
    title: "Handyman Services",
    description:
      "Professional handyman available for various home repairs and improvements.",
    image: "/src/assets/adImages/handyman.webp",
    category: "services",
    location: "Moon City 11",
    locationCoords: [40.7128, -74.006],
    contact: "john@handyman.com",
    seller: "66aa543507690f436c77cb46",
  },
  {
    id: 2,
    title: "Vintage Bicycle for Sale",
    description:
      "Beautiful vintage bicycle in excellent condition. Perfect for collectors or daily use.",
    image: "/src/assets/adImages/bike.webp",
    category: "products",
    location: "Space Street 42",
    locationCoords: [40.7282, -73.9942],
    contact: "+1 (555) 123-4567",
    seller: "66aa543507690f436c77cb46",
  },
  {
    id: 3,
    title: "Community Art Festival",
    description:
      "Join us for a day of art, music, and food at the annual Community Art Festival.",
    image: "/src/assets/adImages/festival.webp",
    category: "events",
    location: "Sunset Boulevard 90",
    locationCoords: [40.7589, -73.9851],
    contact: "info@artfestival.com",
    seller: "66aa543507690f436c77cb46",
  },
  {
    id: 4,
    title: "Web Developer Wanted",
    description:
      "Local startup seeking an experienced web developer for a full-time position.",
    image: "/src/assets/adImages/guyinglasses.webp",
    category: "jobs",
    location: "Tech Hub 5",
    locationCoords: [40.7061, -74.0092],
    contact: "careers@techstartup.com",
    seller: "66aa543507690f436c77cb46",
  },
  {
    id: 5,
    title: "Organic Farm Fresh Produce",
    description:
      "Weekly delivery of organic, locally grown fruits and vegetables.",
    image: "/src/assets/adImages/freshproduce.webp",
    category: "products",
    location: "Farm Road 3",
    locationCoords: [40.7829, -73.9654],
    contact: "orders@organicfarm.com",
    seller: "66aa543507690f436c77cb46",
  },
  {
    id: 6,
    title: "Yoga in the Park",
    description:
      "Free weekly yoga classes in Central Park. All levels welcome!",
    image: "/src/assets/adImages/yogainpark.webp",
    category: "events",
    location: "Central City Park",
    locationCoords: [40.7812, -73.9665],
    contact: "yoga@centralpark.com",
    seller: "66aa543507690f436c77cb46",
  },
];

export default ads;
