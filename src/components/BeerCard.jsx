
const BeerCard = ({ beer }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <a href="/" className="flex justify-center pt-4">
        <img
          className="rounded-t-lg h-60"
          src={beer.image_url}
          alt={beer.name}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {beer.name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">{beer.tagline}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">
          {beer.description}
        </p>
      </div>
    </div>
  );
};

export default BeerCard;
