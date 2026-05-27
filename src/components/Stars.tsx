type StarsProps = {
  // Average rating out of 5. Rounded to the nearest whole star for display.
  rating: number;
};

// A row of 5 stars: filled (yellow) up to the rounded rating, the rest gray.
export default function Stars({ rating }: StarsProps) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      <span className="text-yellow-400">{"★".repeat(filled)}</span>
      <span className="text-gray-600">{"★".repeat(5 - filled)}</span>
    </span>
  );
}
