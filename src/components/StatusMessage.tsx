import { NavLink } from "react-router-dom";

interface StatusMessageProps {
  isLoading?: boolean;
  error?: Error | null;
  isEmpty?: boolean;
  emptyCondition?: boolean;
  messages: {
    loading?: string;
    error?: string;
    notFound?: string;
    empty?: string;
  };
}

const StatusMessage = ({
  isLoading,
  error,
  isEmpty,
  emptyCondition,
  messages,
}: StatusMessageProps) => {
  if (isLoading) {
    return (
      <div className="container py-8">
        <p className="text-lg text-secondary">{messages.loading}</p>
      </div>
    );
  }

  if (error) {
    if (error && "code" in error && error.code === "ERR_BAD_REQUEST") {
      return (
        <div className="container py-8">
          <p className="text-lg text-warning mb-4">{messages.notFound}</p>
          <NavLink
            to="/news"
            className="text-lg font-medium text-primary hover:text-secondary hover:underline focus:text-focus focus:underline"
          >
            Перейдіть до всіх новин
          </NavLink>
        </div>
      );
    }

    return (
      <div className="container py-8">
        <p className="text-lg text-error">{messages.error}</p>
      </div>
    );
  }

  if (isEmpty || emptyCondition) {
    return (
      <div className="container py-8">
        <p className="text-lg text-gray-500">{messages.empty}</p>
      </div>
    );
  }

  return null;
};

export default StatusMessage;
