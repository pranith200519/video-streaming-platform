const movies = [
  // Recent Blockbusters (2023-2024)
  {
    id: 1,
    title: "Oppenheimer",
    image: "https://image.tmdb.org/t/p/w500/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
    year: "2023",
    rating: "8.9",
    language: "English",
    genre: "Drama"
  },
  {
    id: 2,
    title: "Barbie",
    image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    year: "2023",
    rating: "7.8",
    language: "English",
    genre: "Comedy"
  },
  {
    id: 3,
    title: "Dune: Part Two",
    image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    year: "2024",
    rating: "8.5",
    language: "English",
    genre: "Sci-Fi"
  },
  {
    id: 4,
    title: "Poor Things",
    image: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    year: "2023",
    rating: "8.2",
    language: "English",
    genre: "Drama"
  },
  {
    id: 5,
    title: "The Zone of Interest",
    image: "https://image.tmdb.org/t/p/w500/4hDvsx7v0j4mKdqnLQxXmAKqUP5.jpg",
    year: "2023",
    rating: "8.1",
    language: "English",
    genre: "Drama"
  },
  // Recent Telugu Movies
  {
    id: 6,
    title: "Guntur Kaaram",
    image: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
    year: "2024",
    rating: "7.5",
    language: "Telugu",
    genre: "Action"
  },
  {
    id: 7,
    title: "Salaar: Part 1 - Ceasefire",
    image: "https://image.tmdb.org/t/p/w500/1H2xE9ixox4QgdjJgqZQx3JzCto.jpg",
    year: "2023",
    rating: "8.2",
    language: "Telugu",
    genre: "Action"
  },
  {
    id: 8,
    title: "Hi Nanna",
    image: "https://image.tmdb.org/t/p/w500/8KtOyd0YzNc0Q5oktF1aT8yJ9bq.jpg",
    year: "2023",
    rating: "8.0",
    language: "Telugu",
    genre: "Drama"
  },
  // Recent Action Movies
  {
    id: 9,
    title: "Mission: Impossible - Dead Reckoning",
    image: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacWq.jpg",
    year: "2023",
    rating: "8.3",
    language: "English",
    genre: "Action"
  },
  {
    id: 10,
    title: "John Wick: Chapter 4",
    image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    year: "2023",
    rating: "8.5",
    language: "English",
    genre: "Action"
  },
  // Recent Sci-Fi Movies
  {
    id: 11,
    title: "The Creator",
    image: "https://image.tmdb.org/t/p/w500/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    year: "2023",
    rating: "7.8",
    language: "English",
    genre: "Sci-Fi"
  },
  {
    id: 12,
    title: "Rebel Moon - Part One: A Child of Fire",
    image: "https://image.tmdb.org/t/p/w500/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg",
    year: "2023",
    rating: "7.2",
    language: "English",
    genre: "Sci-Fi"
  },
  // Recent Horror Movies
  {
    id: 13,
    title: "Five Nights at Freddy's",
    image: "https://image.tmdb.org/t/p/w500/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg",
    year: "2023",
    rating: "7.5",
    language: "English",
    genre: "Horror"
  },
  {
    id: 14,
    title: "Talk to Me",
    image: "https://image.tmdb.org/t/p/w500/kdPMUMJzyYAc4roD52qavX0nLIC.jpg",
    year: "2023",
    rating: "8.1",
    language: "English",
    genre: "Horror"
  },
  // Recent Comedy Movies
  {
    id: 15,
    title: "Anyone But You",
    image: "https://image.tmdb.org/t/p/w500/5a4JdoYwpf5zx5dEQeRNF5jKH4Q.jpg",
    year: "2023",
    rating: "7.8",
    language: "English",
    genre: "Comedy"
  },
  {
    id: 16,
    title: "The Holdovers",
    image: "https://image.tmdb.org/t/p/w500/2EhsM5qHLacucpDM2MmcQ8eYBfE.jpg",
    year: "2023",
    rating: "8.4",
    language: "English",
    genre: "Comedy"
  },
  // Sports Movies
  {
    id: 301,
    title: "Challengers",
    image: "https://image.tmdb.org/t/p/w500/4hDvsx7v0j4mKdqnLQxXmAKqUP5.jpg",
    year: "2024",
    rating: "8.2",
    language: "English",
    genre: "Sports"
  },
  {
    id: 302,
    title: "Next Goal Wins",
    image: "https://image.tmdb.org/t/p/w500/5a4JdoYwpf5zx5dEQeRNF5jKH4Q.jpg",
    year: "2023",
    rating: "7.8",
    language: "English",
    genre: "Sports"
  },
  {
    id: 303,
    title: "Air",
    image: "https://image.tmdb.org/t/p/w500/2EhsM5qHLacucpDM2MmcQ8eYBfE.jpg",
    year: "2023",
    rating: "8.1",
    language: "English",
    genre: "Sports"
  },
  {
    id: 304,
    title: "Gran Turismo",
    image: "https://image.tmdb.org/t/p/w500/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg",
    year: "2023",
    rating: "7.9",
    language: "English",
    genre: "Sports"
  },
  {
    id: 305,
    title: "The Iron Claw",
    image: "https://image.tmdb.org/t/p/w500/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    year: "2023",
    rating: "8.3",
    language: "English",
    genre: "Sports"
  },
  // Crime Movies
  {
    id: 306,
    title: "Killers of the Flower Moon",
    image: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    year: "2023",
    rating: "8.7",
    language: "English",
    genre: "Crime"
  },
  {
    id: 307,
    title: "The Killer",
    image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    year: "2023",
    rating: "8.4",
    language: "English",
    genre: "Crime"
  },
  {
    id: 308,
    title: "Saltburn",
    image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    year: "2023",
    rating: "8.2",
    language: "English",
    genre: "Crime"
  },
  {
    id: 309,
    title: "The Equalizer 3",
    image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    year: "2023",
    rating: "7.8",
    language: "English",
    genre: "Crime"
  },
  {
    id: 310,
    title: "Fast X",
    image: "https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacWq.jpg",
    year: "2023",
    rating: "7.5",
    language: "English",
    genre: "Crime"
  },
  // Music Videos
  {
    id: 311,
    title: "Taylor Swift: The Eras Tour",
    image: "https://image.tmdb.org/t/p/w500/1H2xE9ixox4QgdjJgqZQx3JzCto.jpg",
    year: "2023",
    rating: "9.2",
    language: "English",
    genre: "Music Video"
  },
  {
    id: 312,
    title: "BTS: Yet to Come in Cinemas",
    image: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
    year: "2023",
    rating: "9.0",
    language: "English",
    genre: "Music Video"
  },
  {
    id: 313,
    title: "Coldplay: Music of the Spheres Live",
    image: "https://image.tmdb.org/t/p/w500/8KtOyd0YzNc0Q5oktF1aT8yJ9bq.jpg",
    year: "2023",
    rating: "8.8",
    language: "English",
    genre: "Music Video"
  },
  {
    id: 314,
    title: "Blackpink: Born Pink",
    image: "https://image.tmdb.org/t/p/w500/1H2xE9ixox4QgdjJgqZQx3JzCto.jpg",
    year: "2023",
    rating: "8.7",
    language: "English",
    genre: "Music Video"
  },
  {
    id: 315,
    title: "Ed Sheeran: Mathematics Tour",
    image: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
    year: "2023",
    rating: "8.5",
    language: "English",
    genre: "Music Video"
  }
];

// Function to generate more movies
const generateMoreMovies = () => {
  const genres = ["Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance", "Thriller", "Adventure", "Sports", "Crime", "Music Video"];
  const years = ["2020", "2021", "2022", "2023", "2024"];
  const languages = ["English", "Telugu"];
  
  // Recent movie titles and images
  const recentMovies = [
    { title: "The Batman", image: "https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg" },
    { title: "Top Gun: Maverick", image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg" },
    { title: "Avatar: The Way of Water", image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" },
    { title: "Black Panther: Wakanda Forever", image: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nk75p.jpg" },
    { title: "RRR", image: "https://image.tmdb.org/t/p/w500/7gKI9hpEMcZUQpNgKrkDzJpbnNS.jpg" },
    { title: "Everything Everywhere All at Once", image: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg" },
    { title: "The Whale", image: "https://image.tmdb.org/t/p/w500/jQ0gylJMxHSNzHCJ3SaG4aXZn8t.jpg" },
    { title: "Tár", image: "https://image.tmdb.org/t/p/w500/2o1d8RKYVxXxNQ5X9YxXxXxXxXx.jpg" },
    { title: "Triangle of Sadness", image: "https://image.tmdb.org/t/p/w500/k3mW4cfZ4bQbR4wGgD0mx0t1fM.jpg" },
    { title: "Women Talking", image: "https://image.tmdb.org/t/p/w500/1H2xE9ixox4QgdjJgqZQx3JzCto.jpg" }
  ];

  // Sports movies
  const sportsMovies = [
    { title: "Moneyball", image: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg" },
    { title: "The Blind Side", image: "https://image.tmdb.org/t/p/w500/8KtOyd0YzNc0Q5oktF1aT8yJ9bq.jpg" },
    { title: "Remember the Titans", image: "https://image.tmdb.org/t/p/w500/1H2xE9ixox4QgdjJgqZQx3JzCto.jpg" },
    { title: "Rush", image: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg" },
    { title: "The Fighter", image: "https://image.tmdb.org/t/p/w500/8KtOyd0YzNc0Q5oktF1aT8yJ9bq.jpg" }
  ];

  // Crime movies
  const crimeMovies = [
    { title: "The Godfather", image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" },
    { title: "Goodfellas", image: "https://image.tmdb.org/t/p/w500/1H2xE9ixox4QgdjJgqZQx3JzCto.jpg" },
    { title: "The Departed", image: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg" },
    { title: "Pulp Fiction", image: "https://image.tmdb.org/t/p/w500/8KtOyd0YzNc0Q5oktF1aT8yJ9bq.jpg" },
    { title: "Heat", image: "https://image.tmdb.org/t/p/w500/1H2xE9ixox4QgdjJgqZQx3JzCto.jpg" }
  ];

  // Music videos
  const musicVideos = [
    { title: "Shape of You - Ed Sheeran", image: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg" },
    { title: "Despacito - Luis Fonsi", image: "https://image.tmdb.org/t/p/w500/8KtOyd0YzNc0Q5oktF1aT8yJ9bq.jpg" },
    { title: "Uppena - Telugu Hits", image: "https://image.tmdb.org/t/p/w500/1H2xE9ixox4QgdjJgqZQx3JzCto.jpg" },
    { title: "Perfect - Ed Sheeran", image: "https://image.tmdb.org/t/p/w500/2CAL2433ZeIihfX1Hb2139CX0pW.jpg" },
    { title: "Senorita - Shawn Mendes", image: "https://image.tmdb.org/t/p/w500/8KtOyd0YzNc0Q5oktF1aT8yJ9bq.jpg" }
  ];

  // Generate 300 movies
  for (let i = 316; i <= 600; i++) {
    let randomMovie;
    let randomGenre;

    // Randomly select genre and corresponding movie
    const genreRoll = Math.random();
    if (genreRoll < 0.2) {
      randomGenre = "Sports";
      randomMovie = sportsMovies[Math.floor(Math.random() * sportsMovies.length)];
    } else if (genreRoll < 0.4) {
      randomGenre = "Crime";
      randomMovie = crimeMovies[Math.floor(Math.random() * crimeMovies.length)];
    } else if (genreRoll < 0.6) {
      randomGenre = "Music Video";
      randomMovie = musicVideos[Math.floor(Math.random() * musicVideos.length)];
    } else {
      randomGenre = genres[Math.floor(Math.random() * (genres.length - 3))];
      randomMovie = recentMovies[Math.floor(Math.random() * recentMovies.length)];
    }

    const randomYear = years[Math.floor(Math.random() * years.length)];
    const randomRating = (7 + Math.random() * 2).toFixed(1);
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    
    movies.push({
      id: i,
      title: `${randomMovie.title} ${Math.random() > 0.5 ? 'Part ' + Math.floor(Math.random() * 3 + 1) : ''}`,
      image: randomMovie.image,
      year: randomYear,
      rating: randomRating,
      language: randomLanguage,
      genre: randomGenre
    });
  }
};

generateMoreMovies();

export default movies; 