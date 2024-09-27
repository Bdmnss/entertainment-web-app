import data from "../../data.json";

interface Params {
  params: {
    moviePage: string;
  };
}

export default function page({ params }: Params) {
  const { moviePage } = params;
  const movie = data.find((movie) => movie.title === moviePage);
  console.log(movie);
  return <div>page</div>;
}
