import Button from "@/components/Button";

export default function Login() {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden p-4">
      <div className="flex w-1/3 min-h-0 min-w-0 shrink-0 flex-col overflow-y-auto border-r border-gray-300 pr-4">
        <div className="max-w-md mx-auto flex flex-col justify-center items-center">
          <p className="text-2xl font-bold pb-4">Register</p>
          <p className="mb-4 text-sm">
            Register an account with Arcadia to gain access to features like
            reviews, ratings and even add new locations!
          </p>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <input type="email" placeholder="Email" />
          <Button onClick={() => {}} variant="secondary">
            Register
          </Button>
        </div>
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2 overflow-hidden pl-4">
        <div className="shrink-0 pb-2">
          <div className="max-w-md mx-auto flex flex-col justify-center items-center">
            <p className="text-2xl font-bold pb-4">Login</p>
            <p className="mb-4 text-sm">Returning users please login here.</p>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <Button onClick={() => {}} variant="secondary">
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
