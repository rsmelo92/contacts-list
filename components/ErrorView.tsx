import { Button } from "./ui/button";

export const ErrorView = ({ error }: { error: Error }) => {
  return (
    <div className="flex items-center justify-center h-[500px] flex-col gap-4">
      <div className="text-red-600">Error loading contacts: {error.message}</div>
      <Button variant="outline" onClick={() => {
        window.location.reload();
      }}>
        Reload
      </Button>
    </div>
  )
}
