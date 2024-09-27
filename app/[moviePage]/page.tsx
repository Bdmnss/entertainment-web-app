import MoviePage from "@/pages/MoviePage";

interface Params {
  params: {
    moviePage: string;
  };
}

export default function Page({ params }: Params) {
  const { moviePage } = params;

  return <MoviePage moviePage={moviePage} />;
}
