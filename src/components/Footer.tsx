export const Footer = () => {
  return (
    <footer className="bg-primary text-light py-4 shadow-inner">
      <div className="container flex justify-between items-center text-sm">
        <span className="opacity-70">
          © {new Date().getFullYear()} FeedPulse
        </span>
        <span className="italic opacity-60">Новини, які знаходять тебе</span>
      </div>
    </footer>
  );
};
