import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-green-900 text-white px-4 py-2 rounded-md w-full"
      disabled={pending}
    >
      {pending ? "Loading..." : "Add"}
    </button>
  );
}
