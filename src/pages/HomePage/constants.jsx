import ImgCarousel1 from "../../assets/images/carousel-image-1.jpg";
import ImgCarousel2 from "../../assets/images/carousel-image-2.jpg";
import ImgCarousel3 from "../../assets/images/carousel-image-3.jpg";
import ImgCarousel4 from "../../assets/images/carousel-image-4.jpg";

import ImgRoom1 from "../../assets/images/room/Room1.jpg";
import ImgRoom2 from "../../assets/images/room/Room2.jpg";
import ImgRoom3 from "../../assets/images/room/Room3.jpg";
import ImgRoom4 from "../../assets/images/room/Room4.jpg";

export const IMAGE_ITEM = [
  {
    img: ImgCarousel1,
    key: "1",
  },
  {
    img: ImgCarousel2,
    key: "2",
  },
  {
    img: ImgCarousel3,
    key: "3",
  },
  {
    img: ImgCarousel4,
    key: "4",
  },
];

export const ROOM_DATA = [
  {
    image: ImgRoom1,
    title: "Hotel DeCasa Seminyak",
    location: "Kuta, Bali, Indonesia",
    description:
      "De Casa Seminyak terletak hanya 13 menit berjalan kaki ke Double Six Beach. DeCasa Seminyak menawarkan akomodasi dengan kolam renang luar ruangan, taman, teras, dan Wi-Fi gratis di Seminyak, 1,1 km dari Pantai Double Six. Akomodasi ini menyediakan tempat parkir pribadi gratis, serta berjarak 1,3 km dari Pantai Seminyak dan 1,4 km dari Pantai Legian. Pura Petitenget berjarak 3,3 km dari apartemen, sedangkan Kuta Square berjarak 5 km. Bandara terdekat adalah Bandara Internasional Ngurah Rai, 8 km dari DeCasa Seminyak.",
    facility: ["Kitchen", "Wifi", "Swimming Pool", "CCTV", "TV", "AC"],
    price: 750000,
  },
  {
    image: ImgRoom2,
    title: "Villa Pavilion Garden",
    location: "Bandung, Indonesia",
    description:
      "Lahan seluas 400 meter persegi yang tenang di Cigadung Selatan, Villa Pavilion Garden memiliki pintu masuk Joglo Lobby and Dining Area sendiri. Tamu juga memiliki tempat parkir lengkap mereka sendiri tepat di depan Villa untuk 4 mobil di carport.",
    facility: ["Kitchen", "Wifi", "Swimming Pool", "CCTV"],
    price: 750000,
  },
  {
    image: ImgRoom3,
    title: "Villa Coco dengan Pemandangan Laut",
    location: "Lovina, Bali, Indonesia",
    description:
      "Villa Coco terletak di tempat yang indah di perbukitan yang dekat dengan Lovina, desa wisata di sisi utara Bali. Lovina hanya berjarak 6 hingga 8 menit berkendara dan memiliki restoran, bar, dan toko yang bagus.",
    facility: ["Kitchen", "Wifi", "Swimming Pool", "Washing Machine"],
    price: 750000,
  },

  {
    image: ImgRoom4,
    title: "Hotel Mezzanine Eksklusif di Seminyak",
    location: "Lovina, Bali, Indonesia",
    description:
      "Terletak di Seminyak, 1,7 km dari Pantai Double Six, The Tanjung Seminyak  menawarkan akomodasi dengan kolam renang outdoor, parkir pribadi gratis, taman, dan teras.",
    facility: [
      "Kitchen",
      "Wifi",
      "Swimming Pool",
      "Washing Machine",
      "CCTV",
      "TV",
      "AC",
    ],
    price: 750000,
  },
];
