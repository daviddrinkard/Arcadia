import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import GameButton from "@/components/GameButton";
import ReviewBlock from "@/components/ReviewBlock";
import WarnModal from "@/components/WarnModal";

export default function Location() {
  const router = useRouter();
  const raw = router.query.id;
  const id = raw === undefined ? undefined : Array.isArray(raw) ? raw[0] : raw;
  const [showModal, setModal] = useState(false);

  const alertUser = (e: React.MouseEvent) => {
    e.preventDefault();
    setModal(true);
    console.log("This thing is workin.");
  };

  const games = [
    { name: "Street Fighter III", genre: "Fighting", id: 1 },
    { name: "Street Fighter IV", genre: "Fighting", id: 2 },
    { name: "Street Fighter V", genre: "Fighting", id: 3 },
    { name: "Street Fighter VI", genre: "Fighting", id: 4 },
    { name: "Street Fighter VII", genre: "Fighting", id: 5 },
    { name: "Street Fighter VIII", genre: "Fighting", id: 6 },
  ];

  const reviews = [
    {
      rating: 5,
      title: "Great Arcade!",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
      id: 1,
    },
    {
      rating: 4,
      title: "Good Arcade!",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
      id: 2,
    },
    {
      rating: 3,
      title: "Bad Arcade!",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
      id: 3,
    },
    {
      rating: 2,
      title: "Terrible Arcade!",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
      id: 4,
    },
    {
      rating: 1,
      title: "Horrible Arcade!",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
      id: 5,
    },
  ];

  useEffect(() => {
    if (!router.isReady || id === undefined) return;
    // fetch locations when you wire the API
  }, [router.isReady, id]);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden p-4">
      {showModal && <WarnModal onClick={() => setModal(false)} />}
      <div className="flex flex-row items-center pb-4">
        <Button url="/" variant="secondary">
          Locations
        </Button>
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-row">
        {/* Left Side */}
        <div className="w-1/2 min-h-0 border-r border-gray-300 flex flex-col">
          {/* Map */}
          <div className="h-40 bg-green-500 m-2 rounded-md items-center justify-center flex">
            Map Goes Here
          </div>

          {/* Name & Locations */}
          <div className="flex flex-col m-2">
            <p className="text-3xl font-bold">Dave&apos;s Arcade</p>
            <div className="flex flex-col text-sm">
              <p>123 Anystreet</p>
              <p>Anytown, USA 92010</p>
              <p>555-555-5555</p>
              <p>info@davesarcade.com</p>
            </div>
            <div className="pt-4">Star Blocks Here XXXXX</div>
          </div>

          {/* Reviews */}
          <div className="flex flex-col m-2 gap-2 overflow-y-auto">
            {reviews.map((review) => (
              <ReviewBlock
                key={review.id}
                rating={review.rating}
                title={review.title}
                review={review.review}
                id={review.id}
              />
            ))}
          </div>
        </div>
        {/* Right Side */}
        <div className="flex w-1/2 min-h-0 min-w-0 flex-col gap-2 overflow-hidden pl-2">
          <div className="w-full shrink-0">
            <p className="text-lg font-bold">Available Games:</p>
          </div>
          <div className="grid min-h-0 w-full flex-1 auto-rows-min grid-cols-2 content-start gap-3 overflow-y-auto">
            {games.map((game) => (
              <GameButton
                key={game.name}
                id={game.id}
                name={game.name}
                genre={game.genre}
                onClick={alertUser}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
