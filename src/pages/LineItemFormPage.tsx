import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ShadowPage() {
  return (
    <div className="space-y-2">
      <iframe
        src={`${backendUrl}/form`}
        className="w-full h-[600px] border"
        title="Shadow Form"
      />
      <div className="text-center text-sm">
        <Link to="/news" className="text-blue-600 hover:underline">
          Перейти до статей
        </Link>
      </div>
    </div>
  );
}
