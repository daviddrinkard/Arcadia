import Button from "./Button";

type WarnModalProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function WarnModal({ onClick }: WarnModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-8 bg-white rounded-md flex flex-col justify-center items-center">
        <p className="text-xl text-bold mb-2">Remove Game from Location?</p>
        <p>Are you sure you want to remove this game from this location?</p>
        <p className="mb-4">
          You can always add the game back later if needed.
        </p>
        <div className="flex flex-row gap-4">
          <Button variant="secondary" onClick={onClick}>
            Proceed
          </Button>
          <Button variant="secondary" onClick={onClick}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
