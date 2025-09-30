import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ShadowPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== backendUrl) return;
      console.log("Повідомлення з iframe:", event.data);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="space-y-2">
      <iframe
        ref={iframeRef}
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
