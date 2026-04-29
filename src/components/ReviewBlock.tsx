type ReviewBlockProps = {
  rating: number;
  title: string;
  review: string;
  id: number;
};

export default function ReviewBlock({
  rating,
  title,
  review,
  id,
}: ReviewBlockProps) {
  return (
    <div className="flex flex-col ">
      <div>{rating} Stars</div>
      <div className="text-lg font-bold">{title}</div>
      <div className="text-sm">{review}</div>
    </div>
  );
}
